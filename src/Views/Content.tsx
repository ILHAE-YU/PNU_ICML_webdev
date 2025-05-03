import React from 'react';
import About from "../Components/About";
import NewsSection from '../Components/NewsSection';
import ResearchSection from '../Components/ResearchSection';
import RecruitSection from '../Components/RecruitSection';
// import Snow from '../Components/Snow'

const Content = () => {
    return (
        <>
            {/* <Snow /> */}
            <About />
            <ResearchSection />
            <RecruitSection />
            <NewsSection />
        </>
    );
};

export default Content;
