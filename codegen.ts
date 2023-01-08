import { CodegenConfig } from "@graphql-codegen/cli";
const useDevServer = false;

const config: CodegenConfig = {
	schema:
		process.env.NODE_ENV === "development"
			? useDevServer
				? "http://localhost:3000/graphql"
				: "https://fr.emanga.tk/graphql"
			: "https://fr.emanga.tk/graphql",
	documents: ["./**/*.tsx"],
	generates: {
		"./__generated__/": {
			preset: "client",
			plugins: [],
			presetConfig: {
				gqlTagName: "gql",
			},
		},
	},
	ignoreNoDocuments: true,
};

export default config;
