import { gql } from 'graphql-request';

export const CREATE_PROJECT = gql`
	mutation CREATE_PROJECT(
		$userId: ID!
		$projectName: String!
		$inviteLink: String!
		$productionURL: String
		$stagingURL: String
		$avatar: ProjectAvatarRelationInput
		$today: Date!
	) {
		userUpdate(
			filter: { id: $userId }
			data: {
				projects: {
					create: {
						name: $projectName
						release: { create: { releaseDate: $today } }
						avatar: $avatar
						configuration: {
							create: {
								inviteLink: $inviteLink
								productionURL: $productionURL
								stagingURL: $stagingURL
							}
						}
					}
				}
			}
		) {
			projects(filter: { name: { equals: $projectName } }) {
				items {
					id
				}
			}
		}
	}
`;

export const UPDATE_PROJECT = gql`
	mutation UPDATE_PROJECT(
		$projectId: ID!
		$projectName: String!
		$productionURL: String
		$stagingURL: String
		$avatar: ProjectAvatarUpdateRelationInput
	) {
		projectUpdate(
			filter: { id: $projectId }
			data: {
				name: $projectName
				avatar: $avatar
				configuration: {
					update: { productionURL: $productionURL, stagingURL: $stagingURL }
				}
			}
		) {
			id
			name
			configuration {
				inviteLink
				productionURL
				stagingURL
				authenticationTokens {
					items {
						id
						type
						key
						value
					}
				}
			}
			avatar {
				downloadUrl
			}
		}
	}
`;

export const JOIN_PROJECT = gql`
	mutation JOIN_PROJECT(
		$userId: ID!
		$inviteLink: String!
		$cutOffDate: DateTime!
	) {
		configurationUpdate(
			filter: { inviteLink: $inviteLink }
			data: { project: { update: { members: { connect: { id: $userId } } } } }
		) {
			project {
				id
				name
				avatar {
					downloadUrl
					shareUrl
				}
				configuration {
					productionURL
					stagingURL
					inviteLink
					authenticationTokens {
						items {
							id
							type
							key
							value
						}
					}
				}
				hasReceivedEvents
				members {
					count
					items {
						firstName
						lastName
						email
						avatar {
							downloadUrl
						}
					}
				}
				userStories(filter: { createdAt: { gte: $cutOffDate } }) {
					count
					items {
						id
						testOutcome {
							items {
								status
								isResolved
								errorDetails {
									stepIndex
									exception
								}
								createdAt
								video {
									downloadUrl
									shareUrl
								}
							}
						}
						title
						testCreatedDate
						isTestCase
						createdAt
					}
				}
				release {
					count
					items {
						id
						name
						releaseDate
						testRuns {
							count
							items {
								id
								status
								ciRun
								createdAt
								testLength
								testOutcome {
									count
									items {
										status
										isResolved
										errorDetails {
											stepIndex
											exception
										}
										createdAt
										video {
											downloadUrl
											shareUrl
										}
										userStory {
											id
											title
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}
`;

export const REMOVE_TEAM_MEMBER = gql`
	mutation REMOVE_TEAM_MEMBER($projectId: ID!, $memberEmail: String) {
		projectUpdate(
			filter: { id: $projectId }
			data: { members: { disconnect: { email: $memberEmail } } }
		) {
			id
		}
	}
`;

export const PROJECT_USER_STORIES = gql`
	fragment stories on UserStory {
		id
		createdAt
		title
		flowIDs
		created
		significance
		recording {
			seleniumScript {
				groups {
					aliasedCount: count
					aliasedItems: items {
						name
						gIndex
						commands {
							count
						}
					}
				}
			}
		}
	}

	query PROJECT_USER_STORIES(
		$projectId: ID!
		$first: Int!
		$skip: Int!
		$significanceFilters: [UserStoryFilter!]
		$sort: [UserStoryOrderBy]
	) {
		recordings: userStoriesList(
			filter: {
				project: { id: { equals: $projectId } }
				isTestCase: { equals: false }
				OR: $significanceFilters
			}
			orderBy: $sort
			first: $first
			skip: $skip
		) {
			count
			items {
				...stories
			}
		}
		testCases: userStoriesList(
			filter: {
				project: { id: { equals: $projectId } }
				isTestCase: { equals: true }
				OR: $significanceFilters
			}
			orderBy: $sort
			first: $first
			skip: $skip
		) {
			count
			items {
				testCreatedDate
				...stories
			}
		}
	}
`;

export const ADD_AUTH_TOKEN = gql`
	mutation ADD_AUTH_TOKEN(
		$projectID: ID!
		$type: String!
		$key: String!
		$value: String!
	) {
		projectUpdate(
			filter: { id: $projectID }
			data: {
				configuration: {
					update: {
						authenticationTokens: {
							create: { type: $type, key: $key, value: $value }
						}
					}
				}
			}
		) {
			configuration {
				authenticationTokens {
					items {
						id
						type
						key
						value
					}
				}
			}
		}
	}
`;

export const REMOVE_AUTH_TOKEN = gql`
	mutation REMOVE_AUTH_TOKEN($projectID: ID!, $tokenID: ID!) {
		projectUpdate(
			filter: { id: $projectID }
			data: {
				configuration: {
					update: { authenticationTokens: { disconnect: { id: $tokenID } } }
				}
			}
		) {
			id
		}
	}
`;
