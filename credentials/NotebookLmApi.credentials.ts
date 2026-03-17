import type { ICredentialType, INodeProperties } from "n8n-workflow";

export class NotebookLmApi implements ICredentialType {
	name = "notebookLmApi";
	displayName = "NotebookLM API";
	documentationUrl = "https://github.com/agmmnn/notebooklm-sdk#readme";
	properties: INodeProperties[] = [
		{
			displayName: "Session JSON",
			name: "sessionJson",
			type: "string",
			typeOptions: { password: true, rows: 4 },
			default: "",
			required: true,
			description:
				"Paste the full contents of <code>~/.notebooklm/session.json</code>. " +
				"Generate it by running: <code>npx notebooklm-sdk login</code>",
		},
	];
}
