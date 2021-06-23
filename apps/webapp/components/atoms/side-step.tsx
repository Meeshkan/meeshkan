import React, { Dispatch, SetStateAction } from 'react';
import { Box, Flex, Text, useColorModeValue } from '@chakra-ui/react';
import { MotionFlex } from './motion';
import { DragHandleIcon } from '@frontend/chakra-theme';
import { useDragControls } from 'framer-motion';
import { ScriptCommand } from '@frontend/meeshkan-types';
// import { Position, useMeasurePosition } from '../../utils/use-measure-position';

type StoryStepProps = {
	stepNumber: number;
	stepName: string;
	scriptCommand: ScriptCommand;
	selectedStep: Number;
	setSelectedStep: Dispatch<SetStateAction<Number>>;
};

export const SideStep = ({
	stepNumber,
	stepName,
	scriptCommand,
	selectedStep,
	setSelectedStep,
}: StoryStepProps) => {
	const hoverBackgroundColor = useColorModeValue('white', 'gray.900');
	const selectedBlue = useColorModeValue('blue.500', 'blue.300');
	const formLabelColor = useColorModeValue('gray.500', 'gray.400');
	// const [isDragging, setDragging] = useState(false);
	// const dragControls = useDragControls();
	// function startDrag(event: PointerEvent<HTMLDivElement>) {
	// 	dragControls.start(event, { snapToCursor: true });
	// 	setDragging(true);
	// }

	return (
		<MotionFlex
			initial={{ y: 100, opacity: 0 }}
			animate={{ y: 0, opacity: 1 }}
			m={2}
			onClick={() => setSelectedStep(scriptCommand.sIndex)}
			// drag="y"
			// dragListener={false}
			// onDragEnd={() => {
			// 	setDragging(false);
			// }}
			// zIndex={isDragging ? 3 : 1}
			// dragControls={dragControls}
		>
			<Flex
				justify="center"
				align="center"
				borderRadius="full"
				h={6}
				w={6}
				minW={6}
				fontWeight="600"
				fontSize="sm"
				mt={2}
				mr={4}
				backgroundColor={
					selectedStep === scriptCommand?.sIndex ? selectedBlue : 'transparent'
				}
				color={
					selectedStep === scriptCommand?.sIndex
						? hoverBackgroundColor
						: 'inherit'
				}
			>
				{stepNumber}
			</Flex>
			<Box
				p={3}
				borderRadius="lg"
				w="full"
				border="1px solid"
				borderColor={
					selectedStep === scriptCommand?.sIndex ? selectedBlue : 'transparent'
				}
				backgroundColor={
					selectedStep === scriptCommand?.sIndex
						? hoverBackgroundColor
						: 'transparent'
				}
				_hover={{
					backgroundColor: hoverBackgroundColor,
				}}
				// sx={{
				// 	':hover #drag-handle': {
				// 		display: 'inline-flex',
				// 	},
				// }}
			>
				<Text
					flex="1"
					fontWeight="400"
					lineHeight="1.4"
					fontSize="md"
					wordBreak="break-all"
				>
					{stepName}
				</Text>
				<Box
				// onPointerDown={startDrag}
				// onPointerUp={() => {
				// 	setDragging(false);
				// }}
				>
					<DragHandleIcon id="drag-handle" display="none" color="gray.300" />
				</Box>
			</Box>
		</MotionFlex>
	);
};
