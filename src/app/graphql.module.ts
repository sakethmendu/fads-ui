import {NgModule} from '@angular/core';
import {ApolloModule, APOLLO_OPTIONS} from 'apollo-angular';
import {ApolloClientOptions, ApolloLink, InMemoryCache} from '@apollo/client/core';
import {HttpLink} from 'apollo-angular/http';
import { setContext } from '@apollo/client/link/context';

const uri = 'http://localhost:8082/graphql/login?username=demo&password=demo'; 
// const uri = 'http://localhost:8082/graphql'; 
export function createApollo(httpLink: HttpLink): ApolloClientOptions<any> {
  // return {
  //   link: httpLink.create({uri}),
  //   cache: new InMemoryCache(),
  // };
  const basic = setContext((operation, context) => ({
    headers: {
      Accept: 'charset=utf-8'
    }
  }));
 
  const auth = setContext((operation, context) => {
    const token = sessionStorage.getItem('access_token');
    // const token = 'eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJfNklreHN4cGk0T0ZlY1hXT0taVDBtZThYVUtMS0V0V01IWi1lblVCT0xRIn0.eyJleHAiOjE2NzA5MDg5OTMsImlhdCI6MTY3MDkwODY5MywianRpIjoiNThkMTkyOTMtNTQ5OC00YWI2LWE2ZGQtNjA5NmFhZTc1MGJjIiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDoxODA4MC9hdXRoL3JlYWxtcy9jYW11bmRhLXBsYXRmb3JtIiwiYXVkIjpbInRhc2tsaXN0IiwidGFza2xpc3QtYXBpIiwib3BlcmF0ZS1hcGkiLCJvcHRpbWl6ZS1hcGkiLCJjYW11bmRhLWlkZW50aXR5LXJlc291cmNlLXNlcnZlciIsImFjY291bnQiXSwic3ViIjoiZWUxM2YzMWItMWE4Zi00NWY0LTlmZjgtOTMzNDFlNTc0NWY3IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoidGFza2xpc3QiLCJzZXNzaW9uX3N0YXRlIjoiMGZiNDJjYzItY2E0Mi00NGY4LWE5MGQtNmVjZTBjOGNhZWI4IiwiYWNyIjoiMSIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwOi8vbG9jYWxob3N0OjgwODIiXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbIlRhc2tsaXN0IiwiRGVmYXVsdCB1c2VyIHJvbGUiLCJPcGVyYXRlIiwiSWRlbnRpdHkiLCJPcHRpbWl6ZSJdfSwicmVzb3VyY2VfYWNjZXNzIjp7InRhc2tsaXN0LWFwaSI6eyJyb2xlcyI6WyJyZWFkOioiLCJ3cml0ZToqIl19LCJvcGVyYXRlLWFwaSI6eyJyb2xlcyI6WyJyZWFkOioiLCJ3cml0ZToqIl19LCJvcHRpbWl6ZS1hcGkiOnsicm9sZXMiOlsid3JpdGU6KiJdfSwiY2FtdW5kYS1pZGVudGl0eS1yZXNvdXJjZS1zZXJ2ZXIiOnsicm9sZXMiOlsicmVhZCIsIndyaXRlIl19LCJhY2NvdW50Ijp7InJvbGVzIjpbIm1hbmFnZS1hY2NvdW50IiwibWFuYWdlLWFjY291bnQtbGlua3MiLCJ2aWV3LXByb2ZpbGUiXX19LCJzY29wZSI6Im9wZW5pZCBwcm9maWxlIGVtYWlsIiwic2lkIjoiMGZiNDJjYzItY2E0Mi00NGY4LWE5MGQtNmVjZTBjOGNhZWI4IiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBlcm1pc3Npb25zIjp7InRhc2tsaXN0LWFwaSI6WyJyZWFkOioiLCJ3cml0ZToqIl0sIm9wZXJhdGUtYXBpIjpbInJlYWQ6KiIsIndyaXRlOioiXSwib3B0aW1pemUtYXBpIjpbIndyaXRlOioiXSwiY2FtdW5kYS1pZGVudGl0eS1yZXNvdXJjZS1zZXJ2ZXIiOlsicmVhZCIsIndyaXRlIl0sImFjY291bnQiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfSwibmFtZSI6IlNha2V0aCBSZWRkeSIsInByZWZlcnJlZF91c2VybmFtZSI6InNha2V0aCIsImdpdmVuX25hbWUiOiJTYWtldGgiLCJmYW1pbHlfbmFtZSI6IlJlZGR5IiwiZW1haWwiOiJzYWtldGhAZ21haWwuY29tIn0.WVRxUJIP-8tic8jBXXXNLVlWfpwty8yiv1G2UNA96aibAPkku_WSykMnWTRCWrxXflrP9v_6flIn131kN5F1YwvvbY1wiNOXpDhxDHzmnoiSnLLyjZ8n47rfP1RTM1_4F2g5dNtiPCMCQWFqIaRWQZDMYYvDA1EmJ-4J-8uW-CqLVagZDgJ_dQ1XXOaeLusQKFME6gUsIItk-sjRHZAHRie9Nm33sonhTxbXbEqvdnIqEwCVUeagpWdj7neC9ll3NVPBAIP5QcMOMA8-z0kCNkd74p7gitRJiEFjN_OzDR0w-7LE8cwAZ07S7JC4Qi8v6_PNS3q3JW5IEEhiISvKrA'
    if (token === null) {
      return {};
    } else {
      return {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };
    }
  });
 
  const link = ApolloLink.from([basic, auth, httpLink.create({ uri })]);
  const cache = new InMemoryCache();
 
  return {
    link,
    cache
  }
}

@NgModule({
  exports: [ApolloModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
  ],
})
export class GraphQLModule {}
