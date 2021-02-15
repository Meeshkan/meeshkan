import React, { useContext, useMemo } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { createSlug } from '../../utils/createSlug';
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
	Heading,
	Avatar,
	Tooltip,
} from '@chakra-ui/react';
import {
	ChatIcon,
	ArrowUpDownIcon,
	QuestionIcon,
	ChevronLeftIcon,
} from '@chakra-ui/icons';
import { transparentize } from '@chakra-ui/theme-tools';
import {
	ActivityIcon,
	VideoIcon,
	CheckSquareIcon,
	PackageIcon,
	SettingsIcon,
	PlusIcon,
	SuitcaseIcon,
	ProfileIcon,
} from '@frontend/chakra-theme';
import NavButton from '../molecules/nav-button';
import { UserContext } from '../../utils/user';
import { show as showIntercom } from '../../utils/intercom';
import SideBarFooter from './sidebar-footer';

const SideBarBody = () => {
	const { projects, project, setProject } = useContext(UserContext);
	const router = useRouter();
	const hasProjects = projects.length > 0;
	const avatarUrl = project?.avatar?.downloadUrl;
	const projectName =
		project?.name || (router.query.projectName as string) || '';
	const slugifiedProjectName = useMemo(() => createSlug(projectName), [
		projectName,
	]);

	const userStoriesHref = `/${slugifiedProjectName}/user-stories`;
	const testRunsHref = `/${slugifiedProjectName}/test-runs`;
	const isSettingsPage = router.pathname.endsWith('settings');

	if (isSettingsPage) {
		return (
			<>
				<Link href={`/${slugifiedProjectName}`} passHref>
					<a>
						<Heading
							as={Flex}
							align="center"
							fontSize="20px"
							fontWeight="500"
							color={useColorModeValue('gray.900', 'gray.200')}
							lineHeight="1"
							mt={6}
						>
							<ChevronLeftIcon w={6} h={6} color="gray.500" />
							Settings
						</Heading>
					</a>
				</Link>
				<Stack mt={6} spacing={6} h="100%">
					<Box>
						<Flex align="flex-start">
							<Box
								rounded="xl"
								bg={useColorModeValue('gray.100', 'gray.800')}
								p={2}
								mr={4}
							>
								<ProfileIcon
									color={useColorModeValue('gray.400', 'gray.500')}
									w={4}
									h={4}
								/>
							</Box>
							<Stack spacing={2} w="full">
								<Heading
									fontSize="16px"
									fontWeight="500"
									color={useColorModeValue('gray.400', 'gray.500')}
									lineHeight="short"
									mt={1}
								>
									Personal
								</Heading>
								<NavButton
									fontSize="14px"
									href={`/${slugifiedProjectName}/settings#profile`}
									isActive={
										router.asPath ===
										`/${slugifiedProjectName}/settings#profile`
									}
								>
									Profile
								</NavButton>
								<NavButton
									fontSize="14px"
									href={`/${slugifiedProjectName}/settings#notifications`}
									isActive={
										router.asPath ===
										`/${slugifiedProjectName}/settings#notifications`
									}
								>
									Notifications
								</NavButton>
							</Stack>
						</Flex>
					</Box>
					<Box>
						<Flex align="flex-start">
							<Box
								rounded="xl"
								bg={useColorModeValue('gray.100', 'gray.800')}
								p={2}
								mr={4}
							>
								<SuitcaseIcon
									color={useColorModeValue('gray.400', 'gray.500')}
									w={4}
									h={4}
								/>
							</Box>
							<Stack spacing={2} w="full">
								<Heading
									fontSize="16px"
									fontWeight="500"
									color={useColorModeValue('gray.400', 'gray.500')}
									lineHeight="short"
									mt={1}
								>
									Project
								</Heading>

								<NavButton
									fontSize="14px"
									href={`/${slugifiedProjectName}/settings#general`}
									isActive={
										router.asPath ===
										`/${slugifiedProjectName}/settings#general`
									}
								>
									General
								</NavButton>
								<NavButton
									fontSize="14px"
									href={`/${slugifiedProjectName}/settings#team-members`}
									isActive={
										router.asPath ===
										`/${slugifiedProjectName}/settings#team-members`
									}
								>
									Team members
								</NavButton>
								<NavButton
									fontSize="14px"
									href={`/${slugifiedProjectName}/settings#details`}
									isActive={
										router.asPath ===
										`/${slugifiedProjectName}/settings#details`
									}
								>
									Details
								</NavButton>
								<NavButton
									disabled={true}
									fontSize="14px"
									href={`/${slugifiedProjectName}/settings#plan-and-billing`}
									isActive={
										router.asPath ===
										`/${slugifiedProjectName}/settings#plan-and-billing`
									}
								>
									Plan and Billing
								</NavButton>
								<NavButton
									disabled={true}
									fontSize="14px"
									href={`/${slugifiedProjectName}/settings#integrations`}
									isActive={
										router.asPath ===
										`/${slugifiedProjectName}/settings#integrations`
									}
								>
									Integrations
								</NavButton>
							</Stack>
						</Flex>
					</Box>

					<Spacer />

					<SideBarFooter isSettings={true} />
				</Stack>
			</>
		);
	}

	return (
		<>
			{hasProjects ? (
				<Stack mt={6}>
					<NavButton
						leftIcon={<ActivityIcon />}
						href={`/${slugifiedProjectName}`}
						isActive={
							router.pathname === '/' || router.pathname === `/[projectName]`
						}
					>
						Health dashboard
					</NavButton>
					<NavButton
						leftIcon={<VideoIcon />}
						href={userStoriesHref}
						isActive={
							router.pathname.split('/').slice(-1)[0] === 'user-stories' ||
							router.asPath.includes('/user-stories')
						}
					>
						User stories
					</NavButton>
					<NavButton
						leftIcon={<CheckSquareIcon />}
						href={testRunsHref}
						isActive={
							router.pathname.split('/').slice(-1)[0] === 'test-runs' ||
							router.asPath.includes('/test-runs')
						}
					>
						Test runs
					</NavButton>
					<NavButton leftIcon={<PackageIcon />} href="/releases" disabled>
						Releases
					</NavButton>
				</Stack>
			) : (
				<Text mt={4} fontStyle="italic">
					You need to finish creating your first project.
				</Text>
			)}
			<Spacer />
			<SideBarFooter />
		</>
	);
};

export default SideBarBody;
