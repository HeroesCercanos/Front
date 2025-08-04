import TrainingView from '@/components/adminDashboard/TrainingView';
import AuthProtected from '@/components/authProtected/authProtected';
import React from 'react';

const training = () => {
	return (
		<AuthProtected>
		<div>
			<TrainingView />
		</div>
		</AuthProtected>

	);
};

export default training;
