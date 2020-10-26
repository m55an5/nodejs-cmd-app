let Person = require("./../../model/Person");
const { generateID } = require('./../../bin/util');

const startLoadInitialFamilyTree = jest.fn();

startLoadInitialFamilyTree.mockReturnValue = (familyMembers) => {   

    let king = new Person(generateID(), "King Arthur", "Male", null);
    let queen = new Person(generateID(), "Queen Margret", "Female", null);
    king.partner = queen.id;


    let bill = new Person(generateID(), "Bill", "Male", queen.name);
    let flora = new Person(generateID(), "Flora", "Female", null);
    bill.partner = flora.id;

    let victoire = new Person(generateID(), "Victoire", "Female", flora.name);
    let ted = new Person(generateID(), "Ted", "Male", null);
    ted.partner = victoire.id;

    let remus = new Person(generateID(), "Remus", "Male", victoire.name);

    let dominique = new Person(generateID(), "Dominique", "Female", flora.name);

    let louis = new Person(generateID(), "Louis", "Male", flora.name);


    let charlie = new Person(generateID(), "Charlie", "Male", queen.name);    

    let percy = new Person(generateID(), "Percy", "Male", queen.name);    
    let audrey = new Person(generateID(), "Audrey", "Female", null);
    percy.partner = audrey.id;

    let molly = new Person(generateID(), "Molly", "Female", audrey.name);
    let lucy = new Person(generateID(), "Lucy", "Female", audrey.name);


    let ronald = new Person(generateID(), "Ronald", "Male", queen.name);
    let helen = new Person(generateID(), "Helen", "Female", null);
    ronald.partner = helen.id;

    let malfoy = new Person(generateID(), "Malfoy", "Male", null);
    let rose = new Person(generateID(), "Rose", "Female", helen.name);
    malfoy.partner = rose.id;

    let draco = new Person(generateID(), "Draco", "Male", rose.name);

    let aster = new Person(generateID(), "Aster", "Female", rose.name);

    let hugo = new Person(generateID(), "Hugo", "Male", helen.name);


    let ginerva = new Person(generateID(), "Ginerva", "Female", queen.name);
    let harry = new Person(generateID(), "Harry", "Male", null);
    harry.partner = ginerva.id;

    let darcy = new Person(generateID(), "Darcy", "Female", null);
    let james = new Person(generateID(), "James", "Male", ginerva.name);
    james.partner = darcy.id;

    let willaim = new Person(generateID(), "William", "Male", darcy.name);

    let albus = new Person(generateID(), "Albus", "Male", ginerva.name);
    let alice = new Person(generateID(), "Alice", "Female", null);
    albus.partner = alice.id;

    let ron = new Person(generateID(), "Ron", "Male", alice.name);

    let ginny = new Person(generateID(), "Ginny", "Female", alice.name);
    
    let lily = new Person(generateID(), "Lily", "Female", ginerva.name);

    // adding children to mothers
    queen.children = [bill.name, charlie.name, percy.name, ronald.name, ginerva.name];
    
    flora.children = [victoire.name, dominique.name, louis.name];

    victoire.children = [remus.name];

    audrey.children = [molly.name, lucy.name];

    helen.children = [rose.name, hugo.name];

    rose.children = [draco.name, aster.name];

    ginerva.children = [james.name, albus.name, lily.name];

    darcy.children = [willaim.name];

    alice.children = [ron.name, ginny.name];


    // adding all members to in memory list
    familyMembers.push(king, queen, bill, flora, victoire, ted, remus, dominique, louis,
                        charlie, percy, audrey, molly, lucy,
                        ronald, helen, malfoy, rose, draco, aster, hugo,
                        ginerva, harry, darcy, james, willaim, alice, albus,
                        ron, ginny, lily);

    return familyMembers;
}

module.exports = {
    startLoadInitialFamilyTree
}