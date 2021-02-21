import React, { useContext, useState } from 'react';
import {
	InputGroup,
	Input,
	InputRightElement,
	IconButton,
	Button,
	Flex,
	useColorModeValue,
	useToast,
} from '@chakra-ui/react';
import { CopyIcon } from '@frontend/chakra-theme';
import { UserContext } from '../../utils/user';
import { useClipboard } from '../../hooks/use-clipboard';
import { eightBaseClient } from '../../utils/graphql';
import { REFRESH_INVITE_LINK } from '../../graphql/project';

const InviteLinkInput = () => {
	const { project, idToken } = useContext(UserContext);
	const [inviteLink, setInviteLink] = useState(
		project.configuration.inviteLink
	);
	const { onCopy } = useClipboard({
		toastTitle: `This project's script is copied to clipboard.`,
		toastMessage: 'Paste it within the `head` of your app.',
		text: project?.configuration?.inviteLink,
		status: 'info',
	});

	const toast = useToast();
	const client = eightBaseClient(idToken);

	const refreshInviteLink = async () => {
		const request = await client
			.request(REFRESH_INVITE_LINK, {
				projectID: project.id,
			})
			.then((res) => {
				toast({
					position: 'bottom-right',
					title: 'Successfully refreshed invite link.',
					description:
						"Copy the invite link and send to anyone you'd like to add to your project.",
					isClosable: true,
					status: 'success',
					variant: 'clean',
				});
				setInviteLink(res.projectUpdate.configuration.inviteLink);
			});
	};

	return (
		<Flex>
			<InputGroup mb={4}>
				<Input
					value={inviteLink}
					color="blue.400"
					onClick={onCopy}
					isReadOnly
				/>
				<InputRightElement>
					<IconButton
						icon={<CopyIcon color="gray.500" />}
						aria-label="Copy invite link"
						onClick={onCopy}
						size="md"
						variant="ghost"
					/>
				</InputRightElement>
			</InputGroup>
			<Button
				colorScheme="gray"
				variant="subtle"
				ml={4}
				border="1px solid"
				borderColor={useColorModeValue('gray.200', 'gray.700')}
				onClick={() => {
					refreshInviteLink();
				}}
			>
				Refresh link
			</Button>
		</Flex>
	);
};

export default InviteLinkInput;
