export const NOT_FOUND_TEXT = {
  not_found: 'page not found',
	error_404: 'error 404', 
} as const;

export const HEADER_TEXT = {
	brand_name: 'tasty',
	logo_alt: 'flowery pot',
	search_aria_label: 'search for recipes',

	links: {
		home: 'home',
		profile: 'profile',
		my_recipes: 'my recipes',
		create_recipe: 'create recipe',
		saved_recipes: 'saved recipes',
		admin_panel: 'admin panel',
		logout: 'logout',
		login_register: 'login | register',
	}
} as const;

export const LOGIN_TEXT = {

	registration: {
		title: 'sign up',
		link_to_login: 'already have an account?'
	},
	login: {
		title: 'login',
		link_to_register: "don't have an account?"
	},
	labels: {
		username: 'username',
		password: 'password',
		upload: {
			title: 'upload profile image',
			file_label: 'browse image',
			cancel_upload: 'cancel image',
			format_info: 'file formats accepted: jpg/jpeg/png/gif',
			size_info: 'maximum upload file size 2Mb'
		}
	},
	tooltips: {
		username: 'enter 6-15 characters, allowed: A-Z a-z 0-9 _ - . @',
		password: 'minimum 6 characters required'
	},
	errors: {
		username: {
			required: 'username is required',
			pattern: 'please enter valid username, check for details'
		},
		password: {
			required: 'please enter minimum 6 characters'
		},
		file_upload_error: 'unsupported file, please check image format and size!',
	},
	submit: {
		register: 'Create Account',
		login: 'login',
	}
}