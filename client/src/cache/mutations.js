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
	mutation Update($email: String!, $password: String!, $firstName: String!, $lastName: String!) {
		update(email: $email, password: $password, firstName: $firstName, lastName: $lastName) {
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

export const ADD_MAP = gql`
	mutation AddMap($map: MapInput!) {
		addMap(map: $map) {
			_id
			name
			owner
			regions {
				_id
				name
				capital
				leader
				landmark
				subregions
			}
		}
	}
`;

export const DELETE_MAP = gql`
	mutation DeleteMap($_id: String!) {
		deleteMap(_id: $_id)
	}
`;