// using
// React's Memo & useState, Context Hooks on local & Global states
// React Query on data fetching

import { useState, memo, createContext, useContext } from "react"
import { QueryClient, QueryClientProvider, useQuery } from "react-query";

const queryClient = new QueryClient();

export default function CountryPicker() {
    return (
        <QueryClientProvider client={queryClient}>
            <CountryProvider>
                <PageContent />
            </CountryProvider>
        </QueryClientProvider>
    )
}

const PageContent = memo(() => {
    return (
        <div><br /><br /><center>
            <SelectCountry />
            <CountryDetails />
        </center></div>
    );
});

PageContent.displayName = 'PageContent';

// using contexts for global state
const CountryContext = createContext();
function CountryProvider({ children }) {
    const [country, setCountry] = useState("CA");
    return <CountryContext.Provider value={{ country, setCountry }}>
        {children}
    </CountryContext.Provider>
}

// https://restcountries.eu/rest/v2/alpha/IN

async function fetchCountry({ queryKey }) {
    const response = await fetch(`https://restcountries.eu/rest/v2/alpha/${queryKey}`);
    const data = await response.json();
    return data;
}

function CountryDetails() {
    // console.log('country details');
    const { country } = useContext(CountryContext);
    const { data, isLoading, error } = useQuery(country, fetchCountry);

    if (isLoading) return <div>Loading..</div>
    if (error) return <div>An error has occurred:!</div>

    return (<div>
        <h3>Selected Country : {country}</h3>
        <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>)
}

function SelectCountry() {
    // console.log('country pick');
    const { country, setCountry } = useContext(CountryContext);

    return <select value={country} onChange={(event) => { setCountry(event.target.value) }}>
        <option value="CA">Canada</option>
        <option value="IN">India</option>
        <option value="MY">Malaysia</option>
    </select>
}