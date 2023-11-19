import { createAction } from '@reduxjs/toolkit';
import { AppRoutesValues } from '../const';

export const redirectToRoute = createAction<AppRoutesValues>('redirectToRoute');
