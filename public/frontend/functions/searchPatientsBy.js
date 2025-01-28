let searchTerm = {searchFor: ""};

export function SearchPatientsBy (term) {
    if (term === 'id') {
        searchTerm = {searchFor: term};
    } else if (term === 'name') {
        searchTerm = {searchFor: term};
    } else if (term === 'surname') {
        searchTerm = {searchFor: term};
    } else {
        searchTerm = {searchFor: "error occured"};
    }
}

export function getSearchPatientsBy () {
    return searchTerm;
}