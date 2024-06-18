import { createTag, deleteTag } from "./tagRequest";
import { Tag } from "../Models";


jest.mock('../Models', () => ({
    Tag: {
        create: jest.fn(),
        destroy: jest.fn()}}));   

describe('On teste la fonction createTag', () => {
    describe('Cela doit retourner un tag', () => {
        describe('Structure', () => {
            test('Cela devrait être une fonction', () => {
                expect(typeof createTag).toBe('function');
            });
        });

        describe('Execution', () => { 
            test('Cela doit me retourner un tag', async () => {
                const req = {
                    body: {
                        name: 'test'
                    }
                };
                const res = {
                    json: jest.fn(),
                    status: jest.fn().mockReturnValue({ json: jest.fn() })
                };

                const tag = { id: 1, name: 'test' };
                Tag.create.mockResolvedValue(tag);

                await createTag(req, res);

                expect(Tag.create).toHaveBeenCalledWith(req.body);
                expect(res.json).toHaveBeenCalledWith({ tag });
            });

            test('Cela doit gérer les erreurs lors de la création d\'un tag', async () => {
                const req = {
                    body: {
                        name: 'test'
                    }
                };
                const res = {
                    json: jest.fn(),
                    status: jest.fn().mockReturnValue({ json: jest.fn() })
                };

                const error = new Error('Erreur de la base de données');
                Tag.create.mockRejectedValue(error);

                await createTag(req, res);

                expect(Tag.create).toHaveBeenCalledWith(req.body);
                expect(res.status).toHaveBeenCalledWith(500);
                expect(res.status().json).toHaveBeenCalledWith({ error: 'Une erreur est survenue lors de la création du tag.' });
            });
        });
    });
});



describe('On teste la fonction deleteTag', () => {
    describe('Cela doit supprimer un tag', () => {
        describe('Structure', () => {
            test('Cela devrait être une fonction', () => {
                expect(typeof deleteTag).toBe('function');
            });
        });

        describe('Execution', () => { 
            test('Cela doit supprimer un tag et retourner le nombre de tags supprimés', async () => {
                const req = {
                    body: {
                        title: 'test'
                    }
                };
                const res = {
                    json: jest.fn(),
                    status: jest.fn().mockReturnValue({ json: jest.fn() })
                };

                const tagRemoved = 1; // Supposons qu'un tag a été supprimé
                Tag.destroy.mockResolvedValue(tagRemoved);

                await deleteTag(req, res);

                expect(Tag.destroy).toHaveBeenCalledWith({
                    where: {
                        title: req.body.title
                    }
                });
                expect(res.json).toHaveBeenCalledWith({ tagRemoved });
            });

            test('Cela doit gérer les erreurs lors de la suppression d\'un tag', async () => {
                const req = {
                    body: {
                        title: 'test'
                    }
                };
                const res = {
                    json: jest.fn(),
                    status: jest.fn().mockReturnValue({ json: jest.fn() })
                };

                const error = new Error('Erreur de la base de données');
                Tag.destroy.mockRejectedValue(error);

                await deleteTag(req, res);

                expect(Tag.destroy).toHaveBeenCalledWith({
                    where: {
                        title: req.body.title
                    }
                });
                expect(res.status).toHaveBeenCalledWith(500);
                expect(res.status().json).toHaveBeenCalledWith({ error: 'Une erreur est survenue lors de la suppression du tag.' });
            });
        });
    });
});