import React, { useState, useEffect } from 'react';
import { api } from "../utilities";
import { Card, Form, Button, Modal } from 'react-bootstrap';

export const Progress = () => {
    const [isCreatingPost, setIsCreatingPost] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editPostId, setEditPostId] = useState(null);
    const [progressPost, setProgressPost] = useState({
        workout_id: null,
        date_completed: null,
        time_to_complete: null,
        reps: null,
        notes: '',
        workout_description: '',
        workout: [],
    });
    const [workout, setWorkout] = useState([]);
    const [selectedWorkoutId, setSelectedWorkoutId] = useState('');
    const [inputTimeToComplete, setInputTimeToComplete] = useState('');
    const [inputReps, setInputReps] = useState(undefined);
    const [inputNotes, setInputNotes] = useState('');
    const [savedPosts, setSavedPosts] = useState([]);
    const [editedPost, setEditedPost] = useState({
        date_completed: '',
        workout_description: '',
        time_to_complete: '',
        reps: '',
        notes: '',
    });
    const [showDeleteConfirmationModal, setShowDeleteConfirmationModal] = useState(false);

    useEffect(() => {
        api.get('workout/workouts/', {
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => setWorkout(response.data))
            .catch(error => console.error('Error fetching workouts:', error));
    }, []);

    let token = localStorage.getItem("token");
    useEffect(() => {
        const fetchSavedPosts = async () => {
            try {
                if (token) {
                    api.defaults.headers.common['Authorization'] = `Token ${token}`
                    const response = await api.get('progress/progress-posts/');
                    setSavedPosts(response.data);
                    console.log(response.data)
                }
            } catch (error) {
                console.error('Error fetching saved posts:', error);
            }
        };

        fetchSavedPosts();
    }, [token, isCreatingPost, showEditModal]);

    useEffect(() => {
        if (isCreatingPost) {
            setProgressPost({
                workout_id: null,
                date_completed: null,
                time_to_complete: null,
                reps: null,
                notes: '',
                workout_description: '',
                workout: [],
            });
            setSelectedWorkoutId('');
            setInputTimeToComplete('');
            setInputReps(undefined);
            setInputNotes('');
        }
    }, [isCreatingPost]);

    const handleDateChange = (e) => {
        setProgressPost(prevProgressPost => ({
            ...prevProgressPost,
            date_completed: e.target.value,
        }));
    };
    const handleTimeToCompleteChange = (e) => {
        setInputTimeToComplete(e.target.value);
    };
    const handleRepsChange = (e) => {
        setInputReps(e.target.value);
    };
    const handleNotesChange = (e) => {
        setInputNotes(e.target.value);
    };

    const handleAddWorkout = () => {
        const selectedWork = workout.find(work => work.id === parseInt(selectedWorkoutId, 10));

        if (selectedWork) {
            setProgressPost(prevProgressPost => ({
                ...prevProgressPost,
                workout: [...prevProgressPost.workout, { ...selectedWork, notes: selectedWork.description }],
                time_to_complete: inputTimeToComplete !== '' ? inputTimeToComplete : selectedWork.time_to_complete || null,
                reps: inputReps !== '' ? inputReps : selectedWork.reps || null,
                notes: inputNotes !== '' ? inputNotes : '',
            }));
        }
        setIsCreatingPost(true);
    };

    const handleCreatePostClick = () => {
        setIsCreatingPost(true);
        setInputReps(undefined);
    };

    const handleSavePost = async () => {
        try {
            if (!progressPost.date_completed) {
                console.error('Date Completed is required.');
                return;
            }

            const postData = {
                workout_id: parseInt(selectedWorkoutId),
                date_completed: progressPost.date_completed,
                time_to_complete: inputTimeToComplete,
                reps: inputReps,
                notes: inputNotes,
                workout_description: progressPost.workout.map(work => work.notes).join('\n'),
            };

            api.defaults.headers.common['Authorization'] = `Token ${localStorage.getItem("token")}`
            const response = await api.post('progress/progress-posts/', postData);

            console.log('Post saved successfully:', response.data);
            setIsCreatingPost(false);
        } catch (error) {
            console.error('Error saving post:', error);
        }
    };

    const handleEdit = (postId) => {
        const postToEdit = savedPosts.find(post => post.id === postId);

        if (postToEdit) {
            setEditedPost({
                date_completed: postToEdit.date_completed,
                workout_description: postToEdit.workout_description,
                time_to_complete: postToEdit.time_to_complete,
                reps: postToEdit.reps,
                notes: postToEdit.notes,
            });
            setEditPostId(postId);
            setShowEditModal(true);
        }
    };

    const handleEditPost = async () => {
        try {
            const postData = {
                date_completed: editedPost.date_completed,
                time_to_complete: editedPost.time_to_complete,
                reps: editedPost.reps !== '' ? editedPost.reps : null, 
                notes: editedPost.notes,
                workout_description: editedPost.workout_description,
            };

            api.defaults.headers.common['Authorization'] = `Token ${localStorage.getItem("token")}`;
            const response = await api.put(`progress/progress-posts/${editPostId}/`, postData);
            console.log('Post updated successfully:', response.data);

            setShowEditModal(false);
            setSavedPosts(savedPosts => savedPosts.map(post => (post.id === editPostId ? response.data : post)));
        } catch (error) {
            console.error('Error updating post:', error);
        }
    };

    const handleDeleteConfirmation = (postId) => {
        setEditPostId(postId);
        setShowDeleteConfirmationModal(true);
    };

    const handleDeleteCancel = () => {
        setEditPostId(null);
        setShowDeleteConfirmationModal(false);
    };

    const handleDeleteConfirm = async () => {
        try {
            if (editPostId) {
                api.defaults.headers.common['Authorization'] = `Token ${localStorage.getItem("token")}`
                const response = await api.delete(`progress/progress-posts/${editPostId}`);
                console.log('Post deleted successfully:', response.data);

                setSavedPosts(savedPosts.filter(post => post.id !== editPostId));
                setEditPostId(null);
                setShowDeleteConfirmationModal(false);
            }
        } catch (error) {
            console.error('Error deleting post:', error);
        }
    };

    return (
        <div>
            <Card>
                <Card.Body>
                    {isCreatingPost && (
                        <>
                            <Card.Title>Workout Completed:</Card.Title>
                            <ul>
                                {progressPost.workout.map(work => (
                                    <li key={work.id}>{work.exercise}: {work.notes}</li>
                                ))}
                            </ul>

                            <Form.Group controlId="formDateCompleted">
                                <Form.Label>Date Completed: (Required)</Form.Label>
                                <Form.Control
                                    type="date"
                                    onChange={handleDateChange}
                                />
                            </Form.Group>

                            <Form.Group controlId="formTimeToComplete">
                                <Form.Label>Time to Complete:</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter time to complete"
                                    value={inputTimeToComplete}
                                    onChange={handleTimeToCompleteChange}
                                />
                            </Form.Group>

                            <Form.Group controlId="formReps">
                                <Form.Label>Reps:</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter reps"
                                    value={inputReps}
                                    onChange={handleRepsChange}
                                />
                            </Form.Group>

                            <Form.Group controlId="formNotes">
                                <Form.Label>Notes:</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter notes"
                                    value={inputNotes}
                                    onChange={handleNotesChange}
                                />
                            </Form.Group>

                            {progressPost.workout.length === 0 && (
                                <Form.Group controlId="formWorkoutId">
                                    <Form.Label>Workout ID: (Required)</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter workout ID"
                                        value={selectedWorkoutId}
                                        onChange={(e) => setSelectedWorkoutId(e.target.value)}
                                    />
                                </Form.Group>
                            )}

                            {progressPost.workout.length === 0 && (
                                <Button variant="primary" onClick={handleAddWorkout}>
                                    Add Workout
                                </Button>
                            )}

                            <Button variant="success" onClick={handleSavePost}>
                                Save Post
                            </Button>
                        </>
                    )}

                    {!isCreatingPost && (
                        <Button variant="primary" onClick={handleCreatePostClick}>
                            Create Post
                        </Button>
                    )}

                    {savedPosts.length > 0 && (
                        <>
                            <Card.Title>Saved Posts:</Card.Title>
                            {savedPosts.sort((a, b) => new Date(b.date_completed) - new Date(a.date_completed)).map(savedPost => (
                                <Card key={savedPost.id}>
                                    <Card.Body>
                                        <strong>Date Completed:</strong> {savedPost.date_completed}<br />
                                        <strong>WOD:</strong> {savedPost.workout_description}<br />
                                        <strong>Time to Complete:</strong> {savedPost.time_to_complete}<br />
                                        <strong>Reps:</strong> {savedPost.reps}<br />
                                        <strong>Notes:</strong> {savedPost.notes}
                                        <Button variant="primary" onClick={() => handleEdit(savedPost.id)}>
                                            Edit
                                        </Button>
                                        <Button variant="danger" onClick={() => handleDeleteConfirmation(savedPost.id)}>
                                            Delete
                                        </Button>
                                    </Card.Body>
                                </Card>
                            ))}
                        </>
                    )}

                    <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
                        <Modal.Header closeButton>
                            <Modal.Title>Edit Post</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form>
                                <Form.Group controlId="formDateCompleted">
                                    <Form.Label>Date Completed:</Form.Label>
                                    <Form.Control
                                        type="date"
                                        value={editedPost.date_completed}
                                        onChange={(e) => setEditedPost({ ...editedPost, date_completed: e.target.value })}
                                    />
                                </Form.Group>

                                <Form.Group controlId="formWorkoutDescription">
                                    <Form.Label>Workout Description:</Form.Label>
                                    <Form.Control
                                        as='textarea'
                                        rows={3}
                                        value={editedPost.workout_description}
                                        onChange={(e) => setEditedPost({ ...editedPost, workout_description: e.target.value })}
                                    />
                                </Form.Group>

                                <Form.Group controlId="formTimeToComplete">
                                    <Form.Label>Time to Complete:</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter time to complete"
                                        value={editedPost.time_to_complete}
                                        onChange={(e) => setEditedPost({ ...editedPost, time_to_complete: e.target.value })}
                                    />
                                </Form.Group>

                                <Form.Group controlId="formReps">
                                    <Form.Label>Reps:</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter reps"
                                        value={editedPost.reps}
                                        onChange={(e) => setEditedPost({ ...editedPost, reps: e.target.value })}
                                    />
                                </Form.Group>

                                <Form.Group controlId="formNotes">
                                    <Form.Label>Notes:</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter notes"
                                        value={editedPost.notes}
                                        onChange={(e) => setEditedPost({ ...editedPost, notes: e.target.value })}
                                    />
                                </Form.Group>

                                <Button variant="primary" onClick={handleEditPost}>
                                    Save Changes
                                </Button>
                            </Form>
                        </Modal.Body>
                    </Modal>

                    <Modal show={showDeleteConfirmationModal} onHide={handleDeleteCancel}>
                        <Modal.Header closeButton>
                            <Modal.Title>Delete Confirmation</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <p>Are you sure you want to delete this post?</p>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleDeleteCancel}>
                                No
                            </Button>
                            <Button variant="danger" onClick={handleDeleteConfirm}>
                                Yes
                            </Button>
                        </Modal.Footer>
                    </Modal>

                </Card.Body>
            </Card>
        </div>
    );
};






