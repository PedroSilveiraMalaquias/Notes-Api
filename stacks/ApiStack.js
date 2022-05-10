import * as sst from "@serverless-stack/resources";
export default class ApiStack extends sst.Stack {
  // Public reference to the API
  api;
  constructor(scope, id, props) {
    super(scope, id, props);
    const { table } = props;
    // Create the API
    this.api = new sst.Api(this, "Api", {
      defaultFunctionProps: {
        environment: {
          TABLE_NAME: table.tableName,
        },
      },
      routes: {
        "POST /notes": "src/create.main",
        "GET /notes": "src/list.main",
        "GET /notes/{id}": "src/get.main",
        "PUT /notes/{id}": "src/update.main",
        "DELETE /notes/{id}": "src/delete.main",
      },
    });
    // Allow the API to access the table
    this.api.attachPermissions([table]);
    // Show the API endpoint in the output
    this.addOutputs({
      ApiEndpoint: this.api.url,
    });
  }
}
/*
curl -X POST -H 'Content-Type: application/json' -d '{"content":"Hello World","attachment":"hello.jpg"}' https://nzph28dq7l.execute-api.us-east-1.amazonaws.com/notes
 response:
{"userId":"123","noteId":"bae73320-cd4e-11ec-9f3d-1b7bf3f97961","content":"Hello World","attachment":"hello.jpg","createdAt":1651849856850}

*/
