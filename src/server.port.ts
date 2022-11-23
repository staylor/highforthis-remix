// this is the application server, not GraphQL - we connect to GraphQL
// as a proxy so that fetch requests from the client are not cross-port/domain
const serverPort = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

export default serverPort;
