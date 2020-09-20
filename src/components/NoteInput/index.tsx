import React, { useState } from 'react';
import styled from 'styled-components';
import Card from '../Card';
import { spaces, mixins } from '@styles/index';
import WeatherIcon from '@components/WeatherIcon';

const { flex, alignCenter } = mixins;

const NoteInputRoot = styled.div`
    ${flex('column')}
    padding: ${spaces.big}px;
    & button {
        margin-top: ${spaces.small}px;
    }
`;

interface Props {
    onSubmit: (note: string) => any;
}

export default function index({ onSubmit }: Props): JSX.Element {
    const [value, setValue] = useState('');
    return (
        <Card>
            <NoteInputRoot>
                <input value={value} onChange={(e) => setValue(e.target.value)} />
                <button
                    onClick={() => {
                        onSubmit(value);
                        setValue('');
                    }}
                >
                    Add Note
                </button>
            </NoteInputRoot>
        </Card>
    );
}
