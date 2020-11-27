import React, { useEffect, useState, useRef } from 'react'
import { useParams} from 'react-router-dom';
import { connect } from 'react-redux';
// Mui
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
// Components
import NavBar from '../../components/NavBar';
import CourseOutline from '../../components/CourseOutline';
import VideoPlayer from '../../components/VideoPlayer';
// Actions
import { getCourse } from '../../redux/actions/coursesActions';

const useStyles = makeStyles((theme) => ({
    root: {
        height: '80%',
        width: 'auto',
    },
    root2: {
        height: '100%',
        width: 'auto',
        padding: theme.spacing(5) 
    },
    title: {
        marginBottom: theme.spacing(2)
    },
    grid: {
        height: '90%',
        width: 'auto'
    },
    paper: {
            minHeight: '100%', 
            width: 'auto',
            padding: theme.spacing(3)
    },
    outline: {
        marginBottom: theme.spacing(2)
    }
}));

var initialLoad = false;


function CourseMaterial(props) {
    const { id } = useParams(); 
    const classes = useStyles();
    const [title, setTitle] = useState(""); 
    const [url, setUrl] = useState(""); 
    const [summary, setSummary] = useState("");

    const handleOutlineSelect = (event, nodeId) => {
        const [section, subsection] = nodeId.split(";");
        if (subsection != undefined) {
            const currentSection = props.courses.content[section]; 

            const index = currentSection.subsections.indexOf(subsection);
            setTitle(currentSection.subsections[index]); 
            setUrl(currentSection.URLs[index]); 
            setSummary(currentSection.descriptions[index]); 
        }
    }
    
    const mounted = useRef(); 
  
    useEffect(() => {
        if (!mounted.current) {
            props.getCourse(id);
            mounted.current = true;
        }
       
        else if (!initialLoad) {
            const firstSection = props.courses.content[props.courses.sections[0]];
            setTitle(firstSection.subsections[0]); 
            setUrl(firstSection.URLs[0]); 
            setSummary(firstSection.descriptions[0]);
            initialLoad = true;
        }
    })

    return (
        <div className={classes.root}>
        <NavBar/>
        <div className={classes.root2}>
            <Typography className={classes.title} variant="h5">{props.courses.title}</Typography>
            <Grid className={classes.grid} container spacing={3}>
                <Grid item xs={3}>
                    <Paper elevation={3} className={classes.paper}>
                    <Typography className={classes.outline} variant="h6">Outline</Typography>
                    <CourseOutline 
                        sections={props.courses.sections}
                        content={props.courses.content}
                        handleSelect={handleOutlineSelect} 
                    />
                    </Paper>
                </Grid>
                <Grid item xs={7}> 
                    <VideoPlayer title={title} url={url} summary={summary} />
                </Grid>
            </Grid>
        </div>
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


