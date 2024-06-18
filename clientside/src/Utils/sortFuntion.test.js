import {boxOfficeSort, lastReleaseSort} from "./sortFunction";

describe('On teste la fonction boxOfficeSort', () => {
    describe('Cela doit retourner un tableau avec des éléments classés par note décroissante', () => {
        describe('Structure', () => {
            test('Cela devrait être une fonction', () => {
                expect(typeof boxOfficeSort).toBe('function');
            });
        });

        describe('Execution', () => {
            test('Cela devrait retourner un tableau', () => {
                expect(Array.isArray(boxOfficeSort([]))).toBe(true);
            });
            test('Cela doit me retourner un tableau avec des éléments classés par ordre décroissance de note', () => { 
                const recipes = [
                    { id: 1, name: "Recipe 1", averageRating: 4.5 },
                    { id: 2, name: "Recipe 2", averageRating: 3.5 },
                    { id: 3, name: "Recipe 3", averageRating: 5 },
                    { id: 4, name: "Recipe 4", averageRating: 2.5 },
                ] 
                expect(boxOfficeSort(recipes)).toEqual([
                    { id: 3, name: "Recipe 3", averageRating: 5 },
                    { id: 1, name: "Recipe 1", averageRating: 4.5 },
                    { id: 2, name: "Recipe 2", averageRating: 3.5 },
                    { id: 4, name: "Recipe 4", averageRating: 2.5 },
                ]);
            });                
        });
    });
});


describe('On teste la fonction lastReleaseSort', () => {
    describe('Cela doit retourner un tableau avec des éléments classés par date de création', () => {
        describe('Structure', () => {
            test('Cela devrait être une fonction', () => {
                expect(typeof lastReleaseSort).toBe('function');
            });
        });

        describe('Execution', () => {
            test('Cela devrait retourner un tableau', () => {
                expect(Array.isArray(lastReleaseSort([]))).toBe(true);
            });
            test('Cela doit me retourner un tableau avec des éléments classés par date de création', () => {    
                const recipes = [
                    { id: 1, name: "Recipe 1", createdAt: "2024-01-01" },
                    { id: 2, name: "Recipe 2", createdAt: "2024-02-01" },
                    { id: 3, name: "Recipe 3", createdAt: "2024-03-01" },
                    { id: 4, name: "Recipe 4", createdAt: "2024-04-01" },
                ] 
                expect(lastReleaseSort(recipes)).toEqual([
                    { id: 4, name: "Recipe 4", createdAt: "2024-04-01" },
                    { id: 3, name: "Recipe 3", createdAt: "2024-03-01" },
                    { id: 2, name: "Recipe 2", createdAt: "2024-02-01" },
                    { id: 1, name: "Recipe 1", createdAt: "2024-01-01" },
                ]);
            });                
        });
    });
})