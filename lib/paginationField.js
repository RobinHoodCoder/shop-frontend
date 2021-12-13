import gql from 'graphql-tag';
import { Q_PAGINATION } from '../gql/queries';

const paginationField = () => {
  console.log('paginationField');
  return {
    keyArgs: false,
    read(
      existing = [], // e.g. }]
      {
        args, // gimme the first x things  and skip 2
        cache, // reference to the cache from Apollo
      } // e.g. :
    ) {
      const { skip, first } = args;
      // Read number of items from cache

      // Read the number of items on the page from the cache
      const data = cache.readQuery({ query: Q_PAGINATION });
      const count = data?._allProductsMeta?.count;
      const page = (skip / first) + 1;
      const pages = Math.ceil(count / first);


      // Check if we have existing items
      const items = existing.slice(skip, skip + first).filter(x => x);

      if (items.length && items.length !== first && page === pages) {
        // If
        // There are items
        // AND there aren't enough items to satisfy how many were requested
        // AND we are on the last page
        // THEN JUST SEND IT
        return items;
      }
      if (items.length !== first) {
        // We don't have any items, we must go to the network to fetch them
        console.log('no items found, lets go to the network');
        return false;
      }

      // If there are items, first return from cache, and we don' t need to go to the network.
      if (items.length) {
        console.log(`There are ${items.length} items in the cache. We dont need to fetch them from the network`);
        return items;
      }
      return false; // fallback to network

      // First thing it does it asks the read function for those items.
      // We can either do one of two things:
      // 1. We can return the items because they are already in the cache
      // 2. Or.. return false from here, (network request)
    },
    merge(existing, incoming, { args }) {
      const { skip, first } = args;
      // This runs when the Apollo client comes back from the network with our product
      // console.log(`MErging items from the network ${incoming.length}`);
      const merged = existing ? existing.slice(0) : [];
      for (let i = skip; i < skip + incoming.length; ++i) {
        merged[i] = incoming[i - skip];
      }
      // console.log(merged);
      // Finally we return the merged items from the cache,
      return merged;
    },
  };
};

export default paginationField;
