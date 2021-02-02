import { gql, useMutation } from "@apollo/client";
import React, { ChangeEvent, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";

const createIssue = gql`
    mutation MyMutation(
        $repositoryId: ID!
        $title: String!
        $body: String = ""
    ) {
        createIssue(
            input: { repositoryId: $repositoryId, title: $title, body: $body }
        ) {
            issue {
                author {
                    login
                }
                title
            }
        }
    }
`;

interface Props {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    repositoryId: string;
}

const CreateIssueModal = ({ open, setOpen, repositoryId }: Props) => {
    const [submit] = useMutation(createIssue);

    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const handleClose = async (shouldSubmit: boolean) => {
        if (shouldSubmit) {
            await submit({ variables: { repositoryId, title, body } });
        }
        setTitle("");
        setBody("");
        setOpen(false);
    };
    if (!open) {
        return null;
    }

    return (
        <Modal size="lg" show={open} onHide={() => setOpen(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Create new issue</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Row className="mb-4">
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                setTitle(e.target.value)
                            }
                            placeholder="Issue title"
                            aria-label="Title"
                        />
                    </Form.Row>
                    <Form.Row className="mb-4">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                setBody(e.target.value)
                            }
                            placeholder="Issue description"
                            aria-label="Body"
                        />
                    </Form.Row>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => handleClose(false)}>
                    Cancel
                </Button>
                <Button variant="primary" onClick={() => handleClose(true)}>
                    Create issue
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateIssueModal;
