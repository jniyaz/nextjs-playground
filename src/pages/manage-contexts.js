import React from 'react';

const MyContext = React.createContext({});
const MyProvider = ({ children }) => {
    const [theme, setTheme] = React.useState('light');
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    const value = {
        theme,
        nextTheme,
        toggleTheme: () => {
            setTheme(nextTheme);
        }
    }

    return <MyContext.Provider value={value}>{children}</MyContext.Provider>
}

function App() {
    return <MyProvider>
        <DirectChild />
    </MyProvider>
}

// re render on state value chnages issues can be avoided in 2 ways, 
// using React Memo hook, 
// or create Provider for context and pass childs to render it..
// const DirectChild = React.memo(() => { });
const DirectChild = () => {
    console.log('direct child');
    return <DeeperChild />
};
// DirectChild.displayName = 'DirectChild';

const DeeperChild = () => {
    console.log('deeper child');
    const { nextTheme, toggleTheme } = React.useContext(MyContext);

    return <div>
        <center><br /><br />
            <p>Theme : {nextTheme}</p>
            <button onClick={toggleTheme}>Change Theme</button>
        </center>
    </div>
}

export default App;
