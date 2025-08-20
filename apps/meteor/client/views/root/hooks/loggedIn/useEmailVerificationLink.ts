import { useToastMessageDispatch, useMethod } from '@rocket.chat/ui-contexts';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { accounts } from '../../../../meteor/facade/accounts';

export const useEmailVerificationLink = () => {
	const dispatchToastMessage = useToastMessageDispatch();
	const { t } = useTranslation();
	const afterVerifyEmail = useMethod('afterVerifyEmail');

	useEffect(() => {
		accounts.verifyEmailToken().then(
			(verified) => {
				if (!verified) return;
				void afterVerifyEmail();
				dispatchToastMessage({ type: 'success', message: t('Email_verified') });
			},
			(error) => {
				dispatchToastMessage({ type: 'error', message: error });
			},
		);
	}, [afterVerifyEmail, dispatchToastMessage, t]);
};
