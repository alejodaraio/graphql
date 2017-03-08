# graphql

POC to test how to use graphql async


- npm install
- npm start
- Open your browser at http://localhost:3000

### Graphql Example


Paste in the GraphiQL this query
```javascript
{ 
    cover {  
        block_list {  
            type 
            data { 
                id 
                title 
            } 
        } 
    }
}
```