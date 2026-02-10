import React, { useCallback } from "react";
import Particles from "react-particles";
import { loadSlim } from "tsparticles-slim";

export const MinecraftParticles = () => {
    const particlesInit = useCallback(async (engine) => {
        await loadSlim(engine);
    }, []);

    return (
        <Particles
            id="tsparticles"
            init={particlesInit}
            options={{
                fullScreen: { enable: false },
                background: {
                    color: {
                        value: "transparent",
                    },
                },
                fpsLimit: 60,
                particles: {
                    color: {
                        value: ["#ffffff", "#77ff77", "#ffff77"],
                    },
                    move: {
                        direction: "top",
                        enable: true,
                        outModes: {
                            default: "out",
                        },
                        random: true,
                        speed: 0.5,
                        straight: false,
                    },
                    number: {
                        density: {
                            enable: true,
                            area: 800,
                        },
                        value: 40,
                    },
                    opacity: {
                        value: { min: 0.1, max: 0.5 },
                        animation: {
                            enable: true,
                            speed: 0.5,
                            sync: false
                        }
                    },
                    shape: {
                        type: "square", 
                    },
                    size: {
                        value: { min: 2, max: 5 },
                    },
                    roll: {
                        enable: true,
                        speed: { min: 5, max: 15 },
                        enlighten: {
                            enable: true,
                            value: 10
                        }
                    },
                    wobble: {
                        enable: true,
                        distance: 5,
                        speed: 5
                    }
                },
                detectRetina: true,
            }}
            className="absolute inset-0 pointer-events-none z-10"
        />
    );
};
