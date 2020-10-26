const personController = require('./personController');
personController.loadInitialFamilyTree();

describe("testing addChild function", () => {
    let actionItems = [];

    it("will call addChild with no exisitng family tree", () => {
        actionItems=["ADD_CHILD", "Luna", "Lola", "Female"];
        const initialFamilyTreeSize = personController.getFamilyListSize();
        let res = personController.addChild(actionItems);
        expect(personController.getFamilyListSize()).toEqual(initialFamilyTreeSize);
        expect(res).toEqual("PERSON_NOT_FOUND");
    });

    it("will call addChild to non existant mother name with data, ", () => {
        const initialFamilyTreeSize = personController.getFamilyListSize();
        actionItems=["ADD_CHILD", "Luna", "Lola", "Female"];
        let res = personController.addChild(actionItems);
        expect(personController.getFamilyListSize()).toEqual(initialFamilyTreeSize);
        expect(res).toEqual("PERSON_NOT_FOUND");
    });

    it("will call addChild to existant mother name with pre loaded data", () => {
        actionItems=["ADD_CHILD", "Flora", "Lola", "Female"];
        const initialFamilyTreeSize = personController.getFamilyListSize();
        let res = personController.addChild(actionItems);
        expect(personController.getFamilyListSize()).toEqual(initialFamilyTreeSize+1);
        expect(res).toEqual("CHILD_ADDED");
    });

    it("will call addChild to existant father name with pre loaded data", () => {
        actionItems=["ADD_CHILD", "Ted", "Lola", "Female"];
        const initialFamilyTreeSize = personController.getFamilyListSize();
        let res = personController.addChild(actionItems);
        expect(personController.getFamilyListSize()).toEqual(initialFamilyTreeSize);
        expect(res).toEqual("CHILD_ADDITION_FAILED");
    });
});

describe("testing getRelationship function", () => {
    let actionItems = [];

    // Paternal Uncle
    it("will call getRelationship to find paternal uncle of Flora", () => {
        actionItems=["GET_RELATIONSHIP", "Flora", "Paternal-Uncle"];
        let res = personController.getRelationship(actionItems);
        expect(res).toEqual("NONE");
    });

    it("will call getRelationship to find paternal uncle of Remus", () => {
        actionItems=["GET_RELATIONSHIP", "Remus", "Paternal-Uncle"];
        let res = personController.getRelationship(actionItems);
        expect(res).toEqual("NONE");
    });

    it("will call getRelationship to find paternal uncle of William", () => {
        actionItems=["GET_RELATIONSHIP", "William", "Paternal-Uncle"];
        let res = personController.getRelationship(actionItems);
        expect(res).toEqual("Albus");
    });

    it("will call getRelationship to find paternal uncle of Unknown", () => {
        actionItems=["GET_RELATIONSHIP", "Unknown", "Paternal-Uncle"];
        let res = personController.getRelationship(actionItems);
        expect(res).toEqual("PERSON_NOT_FOUND");
    });

    // Paternal Aunt
    it("will call getRelationship to find paternal Aunt of Flora", () => {
        actionItems=["GET_RELATIONSHIP", "Flora", "Paternal-Aunt"];
        let res = personController.getRelationship(actionItems);
        expect(res).toEqual("NONE");
    });

    it("will call getRelationship to find paternal Aunt of Remus", () => {
        actionItems=["GET_RELATIONSHIP", "Remus", "Paternal-Aunt"];
        let res = personController.getRelationship(actionItems);
        expect(res).toEqual("NONE");
    });

    it("will call getRelationship to find paternal Aunt of William", () => {
        actionItems=["GET_RELATIONSHIP", "William", "Paternal-Aunt"];
        let res = personController.getRelationship(actionItems);
        expect(res).toEqual("Lily");
    });

    it("will call getRelationship to find paternal Aunt of Unknown", () => {
        actionItems=["GET_RELATIONSHIP", "Unknown", "Paternal-Aunt"];
        let res = personController.getRelationship(actionItems);
        expect(res).toEqual("PERSON_NOT_FOUND");
    });

    // Maternal Uncle
    it("will call getRelationship to find Maternal uncle of Flora", () => {
        actionItems=["GET_RELATIONSHIP", "Flora", "Maternal-Uncle"];
        let res = personController.getRelationship(actionItems);
        expect(res).toEqual("NONE");
    });

    it("will call getRelationship to find Maternal uncle of Remus", () => {
        actionItems=["GET_RELATIONSHIP", "Remus", "Maternal-Uncle"];
        let res = personController.getRelationship(actionItems);
        expect(res).toEqual("Louis");
    });

    it("will call getRelationship to find Maternal uncle of William", () => {
        actionItems=["GET_RELATIONSHIP", "William", "Maternal-Uncle"];
        let res = personController.getRelationship(actionItems);
        expect(res).toEqual("NONE");
    });

    it("will call getRelationship to find Maternal uncle of Albus", () => {
        actionItems=["GET_RELATIONSHIP", "Albus", "Maternal-Uncle"];
        let res = personController.getRelationship(actionItems);
        expect(res).toEqual("Bill Charlie Percy Ronald");
    });

    it("will call getRelationship to find Maternal uncle of Unknown", () => {
        actionItems=["GET_RELATIONSHIP", "Unknown", "Maternal-Uncle"];
        let res = personController.getRelationship(actionItems);
        expect(res).toEqual("PERSON_NOT_FOUND");
    });

    // Maternal Aunt
    it("will call getRelationship to find Maternal Aunt of Flora", () => {
        actionItems=["GET_RELATIONSHIP", "Flora", "Maternal-Aunt"];
        let res = personController.getRelationship(actionItems);
        expect(res).toEqual("NONE");
    });

    it("will call getRelationship to find Maternal Aunt of Remus", () => {
        actionItems=["GET_RELATIONSHIP", "Remus", "Maternal-Aunt"];
        let res = personController.getRelationship(actionItems);
        // we added Lola earlier
        expect(res).toEqual("Dominique Lola");
    });

    it("will call getRelationship to find Maternal Aunt of William", () => {
        actionItems=["GET_RELATIONSHIP", "William", "Maternal-Aunt"];
        let res = personController.getRelationship(actionItems);
        expect(res).toEqual("NONE");
    });

    it("will call getRelationship to find Maternal Aunt of Albus", () => {
        actionItems=["GET_RELATIONSHIP", "Albus", "Maternal-Aunt"];
        let res = personController.getRelationship(actionItems);
        expect(res).toEqual("NONE");
    });

    it("will call getRelationship to find Maternal Aunt of King Arthur", () => {
        actionItems=["GET_RELATIONSHIP", "King Arthur", "Maternal-Aunt"];
        let res = personController.getRelationship(actionItems);
        expect(res).toEqual("NONE");
    });

    it("will call getRelationship to find Maternal Aunt of Unknown", () => {
        actionItems=["GET_RELATIONSHIP", "Unknown", "Maternal-Aunt"];
        let res = personController.getRelationship(actionItems);
        expect(res).toEqual("PERSON_NOT_FOUND");
    });

    // Sister in Law
    it("will call getRelationship to find Sister-in-Law of Flora", () => {
        actionItems=["GET_RELATIONSHIP", "Flora", "Sister-in-Law"];
        let res = personController.getRelationship(actionItems);
        expect(res).toEqual("Ginerva");
    });

    it("will call getRelationship to find Sister-in-Law of Remus", () => {
        actionItems=["GET_RELATIONSHIP", "Remus", "Sister-in-Law"];
        let res = personController.getRelationship(actionItems);
        expect(res).toEqual("NONE");
    });

    it("will call getRelationship to find Sister-in-Law of Ted", () => {
        actionItems=["GET_RELATIONSHIP", "Ted", "Sister-in-Law"];
        let res = personController.getRelationship(actionItems);
        // we added Lola earlier
        expect(res).toEqual("Dominique Lola");
    });

    it("will call getRelationship to find Sister-in-Law of Albus", () => {
        actionItems=["GET_RELATIONSHIP", "Albus", "Sister-in-Law"];
        let res = personController.getRelationship(actionItems);
        expect(res).toEqual("Darcy");
    });

    it("will call getRelationship to find Sister-in-Law of King Arthur", () => {
        actionItems=["GET_RELATIONSHIP", "King Arthur", "Sister-in-Law"];
        let res = personController.getRelationship(actionItems);
        expect(res).toEqual("NONE");
    });

    it("will call getRelationship to find Sister-in-Law of Unknown", () => {
        actionItems=["GET_RELATIONSHIP", "Unknown", "Sister-in-Law"];
        let res = personController.getRelationship(actionItems);
        expect(res).toEqual("PERSON_NOT_FOUND");
    });

    // Brother in Law
    it("will call getRelationship to find Brother-in-Law of Flora", () => {
        actionItems=["GET_RELATIONSHIP", "Flora", "Brother-in-Law"];
        let res = personController.getRelationship(actionItems);
        expect(res).toEqual("Charlie Percy Ronald");
    });

    it("will call getRelationship to find Brother-in-Law of Remus", () => {
        actionItems=["GET_RELATIONSHIP", "Remus", "Brother-in-Law"];
        let res = personController.getRelationship(actionItems);
        expect(res).toEqual("NONE");
    });

    it("will call getRelationship to find Brother-in-Law of Ted", () => {
        actionItems=["GET_RELATIONSHIP", "Ted", "Brother-in-Law"];
        let res = personController.getRelationship(actionItems);
        expect(res).toEqual("Louis");
    });

    it("will call getRelationship to find Brother-in-Law of Alice", () => {
        actionItems=["GET_RELATIONSHIP", "Alice", "Brother-in-Law"];
        let res = personController.getRelationship(actionItems);
        expect(res).toEqual("James");
    });

    it("will call getRelationship to find Brother-in-Law of King Arthur", () => {
        actionItems=["GET_RELATIONSHIP", "King Arthur", "Brother-in-Law"];
        let res = personController.getRelationship(actionItems);
        expect(res).toEqual("NONE");
    });

    it("will call getRelationship to find Brother-in-Law of Unknown", () => {
        actionItems=["GET_RELATIONSHIP", "Unknown", "Brother-in-Law"];
        let res = personController.getRelationship(actionItems);
        expect(res).toEqual("PERSON_NOT_FOUND");
    });

    // Siblings 
    it("will call getRelationship to find siblings of Flora", () => {
        actionItems=["GET_RELATIONSHIP", "Flora", "Siblings"];
        let res = personController.getRelationship(actionItems);
        expect(res).toEqual("NONE");
    });

    it("will call getRelationship to find siblings of Bill", () => {
        actionItems=["GET_RELATIONSHIP", "Bill", "Siblings"];
        let res = personController.getRelationship(actionItems);
        expect(res).toEqual("Charlie Percy Ronald Ginerva");
    });

    it("will call getRelationship to siblings of Louis", () => {
        actionItems=["GET_RELATIONSHIP", "Louis", "Siblings"];
        let res = personController.getRelationship(actionItems);
        // we added Lola earlier
        expect(res).toEqual("Victoire Dominique Lola");
    });

    it("will call getRelationship to find siblings of Unknown", () => {
        actionItems=["GET_RELATIONSHIP", "Unknown", "Siblings"];
        let res = personController.getRelationship(actionItems);
        expect(res).toEqual("PERSON_NOT_FOUND");
    });

    it("will call getRelationship to find unknown of Louis", () => {
        actionItems=["GET_RELATIONSHIP", "Louis", "unknown"];
        let res = personController.getRelationship(actionItems);
        expect(res).toEqual("RELATION_NOT_FOUND");
    });

    // Daughter
    it("will call getRelationship to find daughter of Flora and it will include Lola", () => {
        actionItems=["GET_RELATIONSHIP", "Flora", "Daughter"];
        let res = personController.getRelationship(actionItems);
        // we added Lola earlier
        expect(res).toEqual("Victoire Dominique Lola");
    });

    it("will call getRelationship to find daughter of Bill and it will include Lola", () => {
        actionItems=["GET_RELATIONSHIP", "Bill", "Daughter"];
        let res = personController.getRelationship(actionItems);
        // we added Lola earlier
        expect(res).toEqual("Victoire Dominique Lola");
    });

    it("will call getRelationship to find daughter of non existant person", () => {
        actionItems=["GET_RELATIONSHIP", "RANDOM", "Daughter"];
        let res = personController.getRelationship(actionItems);
        expect(res).toEqual("PERSON_NOT_FOUND");
    });

    it("will call getRelationship to find randon of non existant person", () => {
        actionItems=["GET_RELATIONSHIP", "RANDOM", "randon"];
        let res = personController.getRelationship(actionItems);
        expect(res).toEqual("RELATION_NOT_FOUND");
    });

    it("will call getRelationship to find Daughters Percy", () => {
        actionItems=["GET_RELATIONSHIP", "Percy", "Daughter"];
        let res = personController.getRelationship(actionItems);
        expect(res).toEqual("Molly Lucy");
    });

    // Son
    it("will call getRelationship to find Son of Flora and it will include Louis", () => {
        actionItems=["GET_RELATIONSHIP", "Flora", "Son"];
        let res = personController.getRelationship(actionItems);
        expect(res).toEqual("Louis");
    });

    it("will call getRelationship to find Son of Bill and it will include Louis", () => {
        actionItems=["GET_RELATIONSHIP", "Bill", "Son"];
        let res = personController.getRelationship(actionItems);
        expect(res).toEqual("Louis");
    });

    it("will call getRelationship to find Son of non existant person", () => {
        actionItems=["GET_RELATIONSHIP", "RANDOM", "Son"];
        let res = personController.getRelationship(actionItems);
        expect(res).toEqual("PERSON_NOT_FOUND");
    });

    it("will call getRelationship to find randon of non existant person", () => {
        actionItems=["GET_RELATIONSHIP", "RANDOM", "randon"];
        let res = personController.getRelationship(actionItems);
        expect(res).toEqual("RELATION_NOT_FOUND");
    });

    it("will call getRelationship to find Sons Harry", () => {
        actionItems=["GET_RELATIONSHIP", "Harry", "Son"];
        let res = personController.getRelationship(actionItems);
        expect(res).toEqual("James Albus");
    });

});