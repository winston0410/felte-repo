import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ url, fetch }) => {

	return {
		metadata: {
			title: "",
			description: "",
			url,
			image: ""
		}
	};
};
