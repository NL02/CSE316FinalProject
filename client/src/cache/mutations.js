import { gql } from "@apollo/client";

export const LOGIN = gql`
	mutation Login($email: String!, $password: String!) {
		login(email: $email, password: $password) {
			email 
			_id
			firstName
			lastName
			password
			initials
		}
	}
`;

export const REGISTER = gql`
	mutation Register($email: String!, $password: String!, $firstName: String!, $lastName: String!) {
		register(email: $email, password: $password, firstName: $firstName, lastName: $lastName) {
			email
			password
			firstName
			lastName
		}
	}
`;

export const UPDATE = gql`
	mutation Update($email: String!, $password: String!, $firstName: String!, $lastName: String!, $userEmail: String!) {
		update(email: $email, password: $password, firstName: $firstName, lastName: $lastName, userEmail: $userEmail) {
			email
			password
			firstName
			lastName
		}
	}
`;

export const LOGOUT = gql`
	mutation Logout {
		logout 
	}
`;

export const UPDATE_ITEM_FIELD = gql`
	mutation UpdateItemField($_id: String!, $itemId: String!, $field: String!, $value: String!) {
		updateItemField(_id: $_id, itemId: $itemId, field: $field, value: $value) {
			_id
			name
			capital
			leader
			landmark
		}
	}
`;
export const ADD_REGION = gql`
	mutation Addregion($region: RegionInput!) {
		addRegion(region: $region) {
			_id
			name
			capital
			leader
			landmark
		}
	}
`;

export const DELETE_REGION = gql`
	mutation Deleteregion($mapId: String!, $regionId: String!) {
		deleteRegion(mapId: $mapId, regionId: $regionId) {
			_id
			name
			capital
			leader
			landmark
		}
	}
`;


export const ADD_MAP = gql`
	mutation AddMap($map: MapInput!) {
		addMap(map: $map) {
			_id
			name
			owner
			regions {
				name
				capital
				leader
				landmark
			}
		}
	}
`;

export const DELETE_MAP = gql`
	mutation DeleteMap($_id: String!) {
		deleteMap(_id: $_id) 
	}
`;