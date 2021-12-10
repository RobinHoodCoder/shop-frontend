const paginationField = () => {
  console.log('paginationField');
  return {
    keyArgs: false,
    read(existing = [], { args, cache }) {
      // ask read func for the items
      console.log(existing, args, cache);
    },
    merge() {
      // Runs when Apollo client turns back from the network.

    },
  };
};

export default paginationField;
