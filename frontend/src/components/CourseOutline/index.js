import React, { useState } from 'react'
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';


function CourseOutline(props) {
    const { sections, content } = props;  

    let outline = (sections.map((section) => 
        <TreeItem key={section} nodeId={section} label={section}>
            {content[section].subsections.map((subsection) => 
                <TreeItem key={`${section};${subsection}`} nodeId={`${section};${subsection}`} label={subsection}/>
            )}
        </TreeItem>
    ))

    return (
        <div>
            <TreeView
                defaultCollapseIcon={<ExpandMoreIcon />}
                defaultExpandIcon={<ChevronRightIcon />}
                onNodeSelect={props.handleSelect}
            >
                {outline}
             </TreeView>
        </div>
    )
}

export default CourseOutline; 
