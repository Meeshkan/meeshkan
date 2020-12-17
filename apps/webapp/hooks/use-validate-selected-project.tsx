import { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import slugify from 'slugify';
import { UserContext } from '../utils/user';

export const useValidateSelectedProject = () => {
    const [loading, setLoading] = useState(true);
    const [found, setFound] = useState(true);
    const { projects, project, setProject } = useContext(UserContext);
    const router = useRouter();
	const { projectName } = router.query;

    useEffect(() => {
        const selectedProject = projects.find(
            (project) => slugify(project.name, { lower: true }) === projectName
        );

        setLoading(project.id === -1);
        if (selectedProject) {
            setProject(selectedProject);
            setFound(true);
        } else {
            setLoading(false);
            setFound(false);
        }
    }, [projectName, projects, setProject]);

    return { found, loading };
};
