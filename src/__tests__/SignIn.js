import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { SignInContainer } from '../components/SignIn';

describe('SignIn', () => {
    describe('SignInContainer', () => {
        it('calls onSubmit function with correct arguments when a valid form is submitted', async () => {
            const onSubmit = jest.fn();
            const { getByTestId } = render(<SignInContainer onSubmit={onSubmit} />);

            // await act(async () => {
            //     fireEvent.changeText(getByTestId('usernameField'), 'lari');
            // });
            // await act(async () => {
            //     fireEvent.changeText(getByTestId('passwordField'), 'passu');
            // });
            // await act(async () => {
            //     fireEvent.press(getByTestId('submitButton'));
            // });

            // act not needed ?
            fireEvent.changeText(getByTestId('usernameField'), 'lari');
            fireEvent.changeText(getByTestId('passwordField'), 'passu');
            fireEvent.press(getByTestId('submitButton'));

            await waitFor(() => {
                expect(onSubmit).toHaveBeenCalledTimes(1);
                expect(onSubmit.mock.calls[0][0]).toEqual({
                    username: 'lari',
                    password: 'passu',
                });
            });

        });
    });
});