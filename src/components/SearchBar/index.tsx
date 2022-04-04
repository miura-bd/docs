import React, { createElement } from 'react';
import { getAlgoliaResults } from '@algolia/autocomplete-js';
import algoliasearch from 'algoliasearch';
// import { createQuerySuggestionsPlugin } from '@algolia/autocomplete-plugin-query-suggestions';

import { Autocomplete } from './Autocomplete';
import { ProductItem } from './ProductItem';
import { Search } from './styles';

import { pipe } from 'ramda';

import { groupBy, limit, uniqBy } from './functions';
import { productsPlugin } from './productsPlugin';

const appId = 'W6Q5N5WUDV';
const apiKey = 'a82ff7ed9cd894525d84229ba4a886db';
const searchClient = algoliasearch(appId, apiKey);

// const querySuggestionsPlugin = createQuerySuggestionsPlugin({
//   searchClient,
//   indexName: 'custom_search_staging',
//   getSearchParams() {
//     return {
//       hitsPerPage: 10
//     };
//   }
// });

// const dedupeAndLimitSuggestions = pipe(
//   uniqBy(({ source, item }) => source.sourceId === item.heading),
//   limit(4)
// );

// const groupByCategory = groupBy((hit) => hit.heading, {
//   getSource({ name, items }) {
//     return {
//       getItems() {
//         return items.slice(0, 3);
//       },
//       templates: {
//         header() {
//           return (
//             <>
//               <span className="aa-SourceHeaderTitle">{name}</span>
//               <div className="aa-SourceHeaderLine" />
//             </>
//           );
//         }
//       }
//     };
//   }
// });

function App() {
  return (
    <Search>
      <Autocomplete
        openOnFocus={true}
        getSources={({ query }) => [
          {
            sourceId: 'products',

            getItems() {
              return getAlgoliaResults({
                searchClient,
                queries: [
                  {
                    indexName: 'custom_search_staging',
                    query
                  }
                ]
              });
            },
            templates: {
              item({ item, components }) {
                console.log(item);
                return <ProductItem hit={item} components={components} />;
              }
            }
          }
        ]}
      />
    </Search>
  );
}

export default App;

// import algoliasearch from 'algoliasearch/lite';

// import { autocomplete, getAlgoliaResults } from '@algolia/autocomplete-js';

// import { Search } from './styles';
// import { useEffect } from 'react';

// import { transformData } from '../../utils/transform-search-data';
// import { setSearchQuery, trackSearchQuery } from '../../utils/track';
// import {
//   ALGOLIA_API_KEY,
//   ALGOLIA_INDEX_NAME,
//   UNINITIALIZED_SEARCH_INPUT_SELECTOR
// } from '../../constants/algolia';

// const searchClient = algoliasearch(
//   'W6Q5N5WUDV',
//   'a82ff7ed9cd894525d84229ba4a886db'
// );
// const index = searchClient.initIndex('custom_search_staging');

// async function search(e) {
//   console.log(e.target.value);
//   const result = await index.search(e.target.value);
//   console.log(result);
// }

// export default function SearchBar() {
//   useEffect(() => {
//     if (window.docsearch) {
//       const autocompleteSearch = autocomplete({
//         container: '#autocomplete',
//         getSources() {
//           return [
//             {
//               sourceId: 'querySuggestions',
//               getItemInputValue: ({ item }) => item.query,
//               getItems({ query }) {
//                 return getAlgoliaResults({
//                   searchClient,
//                   queries: [
//                     {
//                       indexName: 'custom_search_staging',
//                       query,
//                       params: {
//                         hitsPerPage: 4
//                       }
//                     }
//                   ]
//                 });
//               },
//               templates: {
//                 item({ item, components }) {
//                   return (
//                     <components.ReverseHighlight hit={item} attribute="query" />
//                   );
//                 }
//               }
//             }
//           ];
//         }
//       });
//     }
//   }, []);

//   return (
//     <>
//       <Search>
//         <div>
//           <div>
//             <div id="autocomplete"></div>

//             <input
//               id="amplify-docs-search-input"
//               className="three-dee-effect"
//               type="search"
//               placeholder="Search"
//             />
//             <img src="/assets/search.svg" alt="search" />
//           </div>
//         </div>
//       </Search>
//     </>
//   );
// }
