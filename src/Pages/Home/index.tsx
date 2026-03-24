import { HandPalm, Play } from "phosphor-react";
import { FormProvider, useForm } from 'react-hook-form'
import * as zod from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { NewCycleForm } from "./Components/NewCycleForm";
import { Countdown } from "./Components/Countdown";
import { useContext } from "react";
import { CyclesContext } from "../../Contexts/CyclesContext";

import { HomeContainer, StartCountdownButton, StopCountdownButton } from "./styles";

const newCycleFormValidationSchema = zod.object({
    task: zod.string().min(1, 'O nome do seu projeto é obrigatório'),
    minutesAmount: zod
        .number()
        .min(5, 'Tempo mínimo de 5 minutos')
        .max(60, 'Tempo máximo de 60 minutos')
})

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

export function Home() {
    const { 
        createNewCycle, 
        InterruptCurrentCycle, 
        activeCycle 
    } = useContext(CyclesContext)

    const newCycleForm = useForm<NewCycleFormData>({
        resolver: zodResolver(newCycleFormValidationSchema),
        defaultValues: {
            task: '',
            minutesAmount: 0,
        }
    });

    const { handleSubmit, watch, reset } = newCycleForm

    function handleCreateNewCycle(data: NewCycleFormData) {
        createNewCycle(data)
        reset()
    }

    const task = watch('task')
    const isSubmitDisabled = !task

    return (
        <HomeContainer>
            <form action="" onSubmit={handleSubmit(handleCreateNewCycle)}>
                <FormProvider {...newCycleForm}>
                    <NewCycleForm />
                </FormProvider>
                <Countdown />

                {activeCycle ? (
                    <StopCountdownButton onClick={InterruptCurrentCycle} type="button">
                        <HandPalm size={24} />
                        Interromper
                    </StopCountdownButton>
                ) : (
                    <StartCountdownButton type="submit" disabled={isSubmitDisabled}>
                        <Play size={24} />
                        Começar
                    </StartCountdownButton>
                )}
            </form>
        </HomeContainer>
    )
}