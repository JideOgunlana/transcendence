// Main.jsx

import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Hero, Signup, Userprofile, Dashboard, Settings, HistoryAll, PongGame, MemoryGame, ErrorPage } from '../../containers';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import './main.css';

const Main = ({ showSignup, userSignedUp, showDashboard, handleUserSignedUp, handleSignup, handleGoToDashboard, lang, setLang, sound, setSound }) => {

    const initialStepState = {
        stepNumber: 0,
        pong: {
            selected: true,
            theme: '3D',
            mode: 'singlePlayer',
            selectedPlayers: []
        },
        memory: {
            selected: false,
            theme: 'icons',
            mode: 'singlePlayer',
            gridSize: '4x4',
            selectedPlayers: []
        },
        aliases: []
    };
    const [step, setStep] = useState(initialStepState);
    const location = useLocation();

    useEffect(() => {
        if (location.pathname !== '/dashboard' 
            && location.pathname !== '/dashboard/pong' 
            && location.pathname !== '/dashboard/memory') {
            setStep(initialStepState);
        }
    }, [location, setStep])


    const handleNextBtnClick = () => {
        setStep({ ...step, stepNumber: step.stepNumber + 1 });
    };

    const handleBackBtnClick = () => {
        setStep(prevStep => {
            const newStepNumber = prevStep.stepNumber - 1;
            return {
                ...prevStep,
                stepNumber: newStepNumber,
                pong: {
                    ...prevStep.pong,
                    selected: newStepNumber === 0 ? true : prevStep.pong.selected
                },
                memory: {
                    ...prevStep.memory,
                    selected: newStepNumber === 0 ? false : prevStep.memory.selected
                }
            };
        });
    };

    const handlePongOptionsChange = (options) => {
        setStep(prevState => ({
            ...prevState,
            pong: { ...prevState.pong, ...options }
        }));
    };

    const handleMemoryOptionsChange = (options) => {
        setStep(prevState => ({
            ...prevState,
            memory: { ...prevState.memory, ...options }
        }));
    };

    const mainClassName = showSignup || userSignedUp || showDashboard ? 'transition-main' : '';

    return (
        <main className={`${mainClassName}`}>
            <Routes>
                <Route path='/' element={<Hero handleSignup={handleSignup} />} />
                <Route path='signup' element={<Signup handleUserSignedUp={handleUserSignedUp} handleGoToDashboard={handleGoToDashboard} />} />
                <Route path='userprofile' element={<Userprofile handleGoToDashboard={handleGoToDashboard} />} />
                <Route path='dashboard'
                    element={
                        <Dashboard step={step}
                            setStep={setStep}
                            handleNextBtnClick={handleNextBtnClick}
                            handleBackBtnClick={handleBackBtnClick}
                            handlePongOptionsChange={handlePongOptionsChange}
                            handleMemoryOptionsChange={handleMemoryOptionsChange} />
                    }
                />
                <Route path='history' element={<HistoryAll />} />
                <Route path='settings' element={<Settings lang={lang} setLang={setLang} sound={sound} setSound={setSound} />} />
                <Route path='dashboard/pong' element={<PongGame step={step} />} />
                <Route path='dashboard/memory' element={<MemoryGame step={step} />} />
                <Route path='*' element={<ErrorPage />} />
            </Routes>
        </main>
    );
}

export default Main;
