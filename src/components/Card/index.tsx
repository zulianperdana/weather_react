import Spinner from '@components/Spinner';
import colors from '@styles/colors';
import React from 'react';
import styled from 'styled-components';

const LoadingOverlay = styled.div`
    position: relative;
`;

const Card = styled.div`
    border-radius: 10px;
    background: ${colors.paper};
    box-shadow: 0 1px 20px rgba(0, 0, 0, 0.1);
`;

const SpinnerContainer = styled.div`
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
`;

interface LoadingOverlayProps {
    loading?: boolean;
    children: React.ReactNode;
    onClick?: () => any;
}

export default function index({ loading, children, onClick }: LoadingOverlayProps): JSX.Element {
    return (
        <Card onClick={onClick}>
            <LoadingOverlay>
                {children}
                {loading && (
                    <SpinnerContainer>
                        <Spinner />
                    </SpinnerContainer>
                )}
            </LoadingOverlay>
        </Card>
    );
}
