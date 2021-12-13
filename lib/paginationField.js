import gql from 'graphql-tag';

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

      const data = cache.readQuery({
        Q_PAGINATION: {
          skip,
          first,
        },
      });
      const count = data?._allProductsMeta?.count;

      const page = (skip / first) + 1;
      const pages = Math.ceil(count / first);
      // ask read func for the items

      // look for non-existing items
      const items = existing.slice(skip, skip + 1);

      if (items.length !== first) {
        // We dont have all the items, so we need to fetch them
        // console.log(existing, args, cache, data);
        return false;
      }
      // If there are items, first return from cache, and we don' t need to go to the network.
      if (items.length) {
        console.log(`There are ${items.length} items in the cache. we gonna send em to Apollo.`);
        return items;
      }
    },
    merge(newThings) {
      console.log(newThings);
      // Runs when Apollo client turns back from the network.
    },
  };
};

export default paginationField;
