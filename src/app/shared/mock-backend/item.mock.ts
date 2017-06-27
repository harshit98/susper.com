export const MockKnowledgeApi = {
    results: {
        uri: 'http://dbpedia.org/resource/Berlin',
        label: 'Berlin',
    },
    MaxHits: 5
};

export const MockSearchApi = {
    searchquery: 'Berlin',
    facet: {
        mincount: 1,
        field: {
            'host_s': 1,
            'url_protocol_s': 1,
            'author_sxt': 1,
            'collection_sxt': 1,            
        }
    }
};
