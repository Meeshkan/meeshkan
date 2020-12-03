import { useContext } from 'react';
import Router from 'next/router';
import {
	Stack,
	Box,
	Flex,
	Spacer,
	IconButton,
	useColorModeValue,
	Divider,
	Menu,
	MenuButton,
	MenuList,
	MenuOptionGroup,
	MenuItemOption,
	MenuItem,
	MenuDivider,
	Button,
	Text,
	Avatar,
} from '@chakra-ui/react';
import { ChatIcon, ArrowUpDownIcon, QuestionIcon } from '@chakra-ui/icons';
import { transparentize } from '@chakra-ui/theme-tools';
import {
	ActivityIcon,
	VideoIcon,
	CheckSquareIcon,
	PackageIcon,
	SettingsIcon,
} from '@frontend/chakra-theme';
import NavButton from '../molecules/nav-button';
import { UserContext, Project } from '../../utils/user';
import { show as showIntercom } from '../../utils/intercom';

type SideBarBodyProps = {
	project: Project;
	setProject: (project: Project) => void;
};

const SideBarBody = ({ project, setProject }: SideBarBodyProps) => {
	const { projects } = useContext(UserContext);
	const hasProjects = projects.length > 0;
	const avatarUrl = project.avatar?.downloadUrl;
	return (
		<>
			{hasProjects ? (
				<Stack mt={6}>
					<NavButton isActive leftIcon={<ActivityIcon />}>
						Health dashboard
					</NavButton>
					<NavButton leftIcon={<VideoIcon />}>User stories</NavButton>
					<NavButton leftIcon={<CheckSquareIcon />}>Test runs</NavButton>
					<NavButton leftIcon={<PackageIcon />}>Releases</NavButton>
				</Stack>
			) : (
				<Text mt={4} fontStyle="italic">
					You need to finish creating your first project.
				</Text>
			)}
			<Spacer />
			<Box>
				<NavButton
					onClick={showIntercom}
					leftIcon={<ChatIcon />}
					mt={2}
				>
					Help and Feedback
				</NavButton>
				<Divider my={4} />
				<Flex align="center">
					<Menu>
						<MenuButton
							as={Button}
							size="sm"
							colorScheme="gray"
							// @ts-expect-error
							backgroundColor={useColorModeValue(
								'gray.50',
								transparentize('gray.800', 0.75)
							)}
							rightIcon={<ArrowUpDownIcon />}
							w="100%"
							textAlign="left"
						>
							<Flex align="center">
								<Avatar
									src={avatarUrl}
									name={project.name}
									icon={
										<QuestionIcon
											color={useColorModeValue('gray.400', 'white')}
											fontSize="1rem"
										/>
									}
									bg={useColorModeValue('gray.200', 'gray.600')}
									size="xs"
									borderRadius="md"
									mr={3}
								/>
								{project.name}
							</Flex>
						</MenuButton>
						<MenuList>
							<MenuOptionGroup
								defaultValue={project.name}
								title="Projects"
								type="radio"
							>
								{projects.map((project) => (
									<MenuItemOption
										key={project.id}
										value={project.name}
										onClick={() => setProject(project)}
									>
										{project.name}
									</MenuItemOption>
								))}
							</MenuOptionGroup>
							<MenuDivider />
							<MenuItem onClick={() => Router.push('/new-project')}>
								Create project
							</MenuItem>
						</MenuList>
					</Menu>
					<IconButton
						aria-label="Settings"
						colorScheme="gray"
						color={useColorModeValue('gray.500', 'gray.400')}
						icon={<SettingsIcon />}
						variant="ghost"
						size="sm"
						ml={2}
					/>
				</Flex>
			</Box>
		</>
	);
};

export default SideBarBody;
