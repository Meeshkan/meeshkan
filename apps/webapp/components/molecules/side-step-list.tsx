import React from 'react';
import { StoryStep } from '../atoms/side-step';

export const StepList = ({ steps }) =>
	steps.map((step, index) => {
		const steps = [];
		typeof step.target == 'string' ? steps.push(step.target) : null;
		typeof step.target == 'object' ? steps.push(step.target.xpath) : null;
		typeof step.target == 'object' ? steps.push(step.target.selector) : null;

		return (
			<StoryStep
				key={index}
				stepName={step.command}
				stepNumber={index + 1}
				subSteps={[...steps]}
			/>
		);
	});
