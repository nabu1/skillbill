import { tableCell } from './cyhelper'

for (let i = 0; i < 5 ; i++) {
describe('I. Documents filtering', () => {
  it('1. .. using JS=5, Java=3 and ObjC without rank specified, should get at least 3 devs' +
    'and pressing Clear button should clear all the select boxes', () => {

    cy.visit('http://localhost:8080')

    .get("[data-test='skill_1']").click({ force: true })
    cy.get("#app > div.v-menu__content.theme--light.menuable__content__active > div > div > div:nth-child(4) > a > div > div").click()

    .get("[data-test='rank_1']").click({ force: true })
    cy.get("#app > div.v-menu__content.theme--light.menuable__content__active > div > div > div:nth-child(2) > a > div > div").click()

    .get("[data-test='skill_2']").click({ force: true })
    cy.get("#app > div.v-menu__content.theme--light.menuable__content__active > div > div > div:nth-child(5) > a > div > div").click()

    .get("[data-test='rank_2']").click({ force: true })
    cy.get("#app > div.v-menu__content.theme--light.menuable__content__active > div > div > div:nth-child(2) > a > div > div").click()

    .get("[data-test='skill_3']").click({ force: true })
    cy.get("#app > div.v-menu__content.theme--light.menuable__content__active > div > div > div:nth-child(6) > a > div > div").click()

    .get("[data-test='rank_3']").click({ force: true })
    //cy.get("#app > div.v-menu__content.theme--light.menuable__content__active > div > div > div:nth-child(5) > a > div > div").click()

    .get("[data-test='btnSearch']").click().wait(1000)

    cy.get(tableCell(1, 6)).should('contain', 'JS')
    cy.get(tableCell(1, 7)).contains(/[4,5]/).should('exist')

    cy.get(tableCell(1, 8)).should('contain', 'Java')
    cy.get(tableCell(1, 9)).contains(/[3,4,5]/).should('exist')

    cy.get(tableCell(1, 10)).should('contain', 'ObjC')
    cy.get(tableCell(1, 11)).contains(/[1,2,3,4,5]/).should('exist')

    cy.get(tableCell(2, 6)).should('contain', 'JS')
    cy.get(tableCell(2, 7)).contains(/[4,5]/).should('exist')

    cy.get(tableCell(2, 8)).should('contain', 'Java')
    cy.get(tableCell(2, 9)).contains(/[3,4,5]/).should('exist')

    cy.get(tableCell(2, 10)).should('contain', 'ObjC')
    cy.get(tableCell(2, 11)).contains(/[1,2,3,4,5]/).should('exist')

    cy.get("[data-test='btnClear']").click().wait(1000)
    cy.get("[data-test='skill_1']").should('contain', '')
    cy.get("[data-test='skill_2']").should('contain', '')
    cy.get("[data-test='skill_3']").should('contain', '')

    cy.get("[data-test='rank_1']").should('contain', '')
    cy.get("[data-test='rank_2']").should('contain', '')
    cy.get("[data-test='rank_3']").should('contain', '')

    cy.scrollTo(0, 0)
  })



})


  describe('II. Deleting a dev', () => {
    it.only('1. ..  should immediately remove him from the view', () => {

      cy.visit('http://localhost:8080').wait(4000) 
      // cy.get('tr:nth-child(1) > td.text-xs-left.body-2:nth-child(2)').should('not.have.text', '19')

      //! tu wycinka rowu

      cy.get('tr:nth-child(1) > td.text-xs-left.body-2:nth-child(2)').should('not.have.text', '19')
    })
  })
}



