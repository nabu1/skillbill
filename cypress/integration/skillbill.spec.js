import { tableCell } from './cyhelper'

for (let i = 0; i < 1 ; i++) {

  describe('I. Documents filtering', () => {
    it.skip('1. .. using JS=4, Java=2 and ObjC without rank specified, should get at least 3 devs' +
      'and pressing Clear button should clear all the select boxes', () => {

      cy.visit('http://localhost:8080')
      .get("[data-test='skill_1']").click({ force: true })
      cy.get("#app > div.v-menu__content.theme--light.menuable__content__active > div > div > div:nth-child(4) > a > div > div").click()

      .get("[data-test='rank_1']").click({ force: true })
      cy.get("#app > div.v-menu__content.theme--light.menuable__content__active > div > div > div:nth-child(2) > a > div > div").click()

      .get("[data-test='skill_2']").click({ force: true })
      cy.get("#app > div.v-menu__content.theme--light.menuable__content__active > div > div > div:nth-child(5) > a > div > div").click()

      .get("[data-test='rank_2']").click({ force: true })
      cy.get("#app > div.v-menu__content.theme--light.menuable__content__active > div > div > div:nth-child(4) > a > div > div").click()

      .get("[data-test='skill_3']").click({ force: true })
      cy.get("#app > div.v-menu__content.theme--light.menuable__content__active > div > div > div:nth-child(6) > a > div > div").click()

      //.get("[data-test='rank_3']").click({ force: true })
      //cy.get("#app > div.v-menu__content.theme--light.menuable__content__active > div > div > div:nth-child(5) > a > div > div").click()

      .get("[data-test='btnSearch']").click().wait(2000)
//cy.pause()

      cy.get(tableCell(1, 5)).should('contain', 'JS')
      cy.get(tableCell(1, 6)).contains(/[4,5]/).should('exist')

      cy.get(tableCell(1, 7)).should('contain', 'Java')
      cy.get(tableCell(1, 8)).contains(/[3,4,5]/).should('exist')

      cy.get(tableCell(1, 9)).should('contain', 'ObjC')
      cy.get(tableCell(1, 10)).contains(/[1,2,3,4,5]/).should('exist')

      cy.get(tableCell(2, 5)).should('contain', 'JS')
      cy.get(tableCell(2, 6)).contains(/[4,5]/).should('exist')

      cy.get(tableCell(2, 7)).should('contain', 'Java')
      cy.get(tableCell(2, 8)).contains(/[2,3,4,5]/).should('exist')

      cy.get(tableCell(2, 9)).should('contain', 'ObjC')
      cy.get(tableCell(2, 10)).contains(/[1,2,3,4,5]/).should('exist')

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
    it.skip('1. ..  should immediately remove him from the view', () => {

      cy.visit('http://localhost:8080').wait(4000)
      cy.get('tr:nth-child(1) > td.text-xs-left.body-2:nth-child(1)').should('have.text', '5')

      // deleting row
      cy.get("tr:nth-child(1) > td.justify-center.layout.px-0 > i:nth-child(3)").click()
      cy.get('tr:nth-child(1) > td.text-xs-left.body-2:nth-child(2)').should('not.have.text', '5')
    })
  })

  describe('III. Inserting a dev', () => {
    it.only('1. .. should immediately add him to the view (JS=5, Java=5, C=5)', () => {
      cy.visit('http://localhost:8080').wait(2000)

      cy.get('#main > nav > div > div.layout.xs12.sm1.d-flex.ml-2 > button.mt-3.mr-0.v-btn.theme--dark.primary > div').click().wait(1000)
      cy.get("[data-test='first']").type('Hans')
      cy.get("[data-test='last']").type('Klops')

      cy.get('#app > div:nth-child(11) > div > div > div:nth-child(1) > a > div > div').click({ force: true})
      cy.get('#app > div:nth-child(10) > div > div > div:nth-child(4) > a > div > div').click({ force: true})
      cy.get('#app > div:nth-child(9) > div > div > div:nth-child(1) > a > div > div').click({ force: true})
      cy.get('#app > div:nth-child(8) > div > div > div:nth-child(5) > a > div > div').click({ force: true})
      cy.get('#app > div:nth-child(7) > div > div > div:nth-child(1) > a > div > div').click({ force: true})
      cy.get('#app > div:nth-child(6) > div > div > div:nth-child(1) > a > div > div').click({ force: true})

      cy.get('#app > div:nth-child(5) > div > div > div:nth-child(1) > a > div > div').click({ force: true})

      cy.get("[data-test='btnSave']").click({ force: true })


    })
  })
}


// ('#app > div:nth-child(10) > div > div > div:nth-child(1) > a > div > div')

