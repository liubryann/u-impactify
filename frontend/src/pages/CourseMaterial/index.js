import React, { useEffect, useState } from 'react'
import { useParams} from 'react-router-dom';
import { connect } from 'react-redux';

import { getCourse } from '../../redux/actions/coursesActions';

function CourseMaterial(props) {
    const { id } = useParams(); 
    
    useEffect(() => {
        props.getCourse(id);
    }, [])
    return (
        <div>
        </div>
    )
}

const mapDispatchToProps = {
    getCourse: getCourse
};

const mapStateToProps = (state) => ({
    courses: state.courses
});

export default connect(mapStateToProps, mapDispatchToProps)(CourseMaterial);


