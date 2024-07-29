describe("Central de Atendimento ao Cliente TAT", () => {
  beforeEach(() => {
    cy.visit("./src/index.html");
  });

  it("verifica o título da aplicação", () => {
    cy.title().should("be.equal", "Central de Atendimento ao Cliente TAT");
  });

  it("preenche os campos obrigatórios e envia o formulário", () => {
    const longText = Cypress._.repeat("Teste ", 50);

    cy.clock();

    cy.get("#firstName").should("be.visible").type("Fulano");
    cy.get("#lastName").should("be.visible").type("Ciclano");
    cy.get("#email").should("be.visible").type("fulano@test.com");
    cy.get("#open-text-area").should("be.visible").type(longText, { delay: 0 });
    cy.contains("button", "Enviar").should("be.visible").click();

    cy.get(".success").as("msgSucesso").should("be.visible");
    cy.get("@msgSucesso").contains("Mensagem enviada com sucesso.");

    cy.tick(3000);
    cy.get("@msgSucesso").should("not.be.visible");
  });

  it("exibe mensage mde erro ao submeter o formulário com um email com formatação errada", () => {
    const longText = Cypress._.repeat("Teste ", 50);

    cy.clock();

    cy.get("#firstName").should("be.visible").type("Fulano");
    cy.get("#lastName").should("be.visible").type("Ciclano");
    cy.get("#email").should("be.visible").type("fulano@test,com");
    cy.get("#open-text-area").should("be.visible").type(longText, { delay: 0 });
    cy.contains("button", "Enviar").should("be.visible").click();

    cy.get(".error").as("msgError").should("be.visible");
    cy.get("@msgError").contains("Valide os campos obrigatórios!");

    cy.tick(3000);
    cy.get("@msgError").should("not.be.visible");
  });

  it("telefone só aceita valor numérico", () => {
    cy.get("#phone").should("be.visible").type("Fulano");
    cy.get("#phone").should("not.have.value", "Fulano");
  });

  it("exibe mensage mde erro quando telefone é obrigatório, mas não é preenchido", () => {
    const longText = Cypress._.repeat("Teste ", 50);

    cy.clock();

    cy.get("#firstName").should("be.visible").type("Fulano");
    cy.get("#lastName").should("be.visible").type("Ciclano");
    cy.get("#email").should("be.visible").type("fulano@test.com");
    cy.get("#open-text-area").should("be.visible").type(longText, { delay: 0 });
    cy.get("#phone-checkbox").check().should("be.checked");
    cy.contains("button", "Enviar").should("be.visible").click();

    cy.get(".error").as("msgError").should("be.visible");
    cy.get("@msgError").contains("Valide os campos obrigatórios!");

    cy.tick(3000);
    cy.get("@msgError").should("not.be.visible");
  });

  it("envia o formulário com sucesso usando um comando customizado", () => {
    const form = {
      firstName: "Fulano",
      lastName: "Ciclano",
      email: "fulano@test.com",
      longText: Cypress._.repeat("Teste ", 50),
    };

    cy.clock();

    cy.fillMandatoryFieldsAndSubmit(form);

    cy.get(".success").as("msgSucesso").should("be.visible");
    cy.get("@msgSucesso").contains("Mensagem enviada com sucesso.");

    cy.tick(3000);
    cy.get("@msgSucesso").should("not.be.visible");
  });

  it("seleciona um produto (YouTube) por seu texto", () => {
    cy.clock();

    cy.get("#product").select("YouTube").should("have.value", "youtube");

    cy.fillMandatoryFieldsAndSubmit();

    cy.get(".success").as("msgSucesso").should("be.visible");
    cy.get("@msgSucesso").contains("Mensagem enviada com sucesso.");

    cy.tick(3000);
    cy.get("@msgSucesso").should("not.be.visible");
  });

  it("seleciona um produto (Mentoria) por seu valor (value)", () => {
    cy.clock();

    cy.get("#product").select("mentoria").should("have.value", "mentoria");

    cy.fillMandatoryFieldsAndSubmit();

    cy.get(".success").as("msgSucesso").should("be.visible");
    cy.get("@msgSucesso").contains("Mensagem enviada com sucesso.");

    cy.tick(3000);
    cy.get("@msgSucesso").should("not.be.visible");
  });

  it("seleciona um produto (Blog) por seu indice", () => {
    cy.clock();

    cy.get("#product").select(1).should("have.value", "blog");

    cy.fillMandatoryFieldsAndSubmit();

    cy.get(".success").as("msgSucesso").should("be.visible");
    cy.get("@msgSucesso").contains("Mensagem enviada com sucesso.");

    cy.tick(3000);
    cy.get("@msgSucesso").should("not.be.visible");
  });

  it('marca o tipo de atendimento "Feedback"', () => {
    cy.clock();

    cy.get('input[type="radio"][value="feedback"]')
      .check()
      .should("be.checked");

    cy.fillMandatoryFieldsAndSubmit();

    cy.get(".success").as("msgSucesso").should("be.visible");
    cy.get("@msgSucesso").contains("Mensagem enviada com sucesso.");

    cy.tick(3000);
    cy.get("@msgSucesso").should("not.be.visible");
  });

  it("marca cada tipo de atendimento", () => {
    cy.get('input[type="radio"]').each((typeOfService) => {
      cy.wrap(typeOfService).check().should("be.checked");
    });

    cy.clock();

    cy.fillMandatoryFieldsAndSubmit();

    cy.get(".success").as("msgSucesso").should("be.visible");
    cy.get("@msgSucesso").contains("Mensagem enviada com sucesso.");

    cy.tick(3000);
    cy.get("@msgSucesso").should("not.be.visible");
  });

  it("marca ambos os checkboxes, depois desmarca o último", () => {
    cy.get('input[type="checkbox"]')
      .check()
      .should("be.checked")
      .last()
      .uncheck()
      .should("not.be.checked");

    cy.clock();

    cy.fillMandatoryFieldsAndSubmit();

    cy.get(".success").as("msgSucesso").should("be.visible");
    cy.get("@msgSucesso").contains("Mensagem enviada com sucesso.");

    cy.tick(3000);
    cy.get("@msgSucesso").should("not.be.visible");
  });

  it("selecione um arquivo da pasta fixture", () => {
    cy.get("#file-upload")
      .selectFile("cypress/fixtures/example.json")
      .should((input) => {
        expect(input[0].files[0].name).to.equal("example.json");
      });

    cy.clock();

    cy.fillMandatoryFieldsAndSubmit();

    cy.get(".success").as("msgSucesso").should("be.visible");
    cy.get("@msgSucesso").contains("Mensagem enviada com sucesso.");

    cy.tick(3000);
    cy.get("@msgSucesso").should("not.be.visible");
  });

  it("selecione um arquivo simulando um drag-and-drop", () => {
    cy.get("#file-upload")
      .selectFile("cypress/fixtures/example.json", { action: "drag-drop" })
      .should((input) => {
        expect(input[0].files[0].name).to.equal("example.json");
      });

    cy.clock();

    cy.fillMandatoryFieldsAndSubmit();

    cy.get(".success").as("msgSucesso").should("be.visible");
    cy.get("@msgSucesso").contains("Mensagem enviada com sucesso.");

    cy.tick(3000);
    cy.get("@msgSucesso").should("not.be.visible");
  });

  it("selecione um arquivo utilizando uma fixture para a qual foi dada um alias", () => {
    cy.fixture("example.json").as("sampleFile");

    cy.get("#file-upload")
      .selectFile("@sampleFile")
      .should((input) => {
        expect(input[0].files[0].name).to.equal("example.json");
      });

    cy.clock();

    cy.fillMandatoryFieldsAndSubmit();

    cy.get(".success").as("msgSucesso").should("be.visible");
    cy.get("@msgSucesso").contains("Mensagem enviada com sucesso.");

    cy.tick(3000);
    cy.get("@msgSucesso").should("not.be.visible");
  });

  it("verifica que a política de privacidade abre em outra aba sem a necessidade de um clique", () => {
    cy.contains("a", "Política de Privacidade")
      .should("have.attr", "href", "privacy.html")
      .and("have.attr", "target", "_blank");

    cy.clock();

    cy.fillMandatoryFieldsAndSubmit();

    cy.get(".success").as("msgSucesso").should("be.visible");
    cy.get("@msgSucesso").contains("Mensagem enviada com sucesso.");

    cy.tick(3000);
    cy.get("@msgSucesso").should("not.be.visible");
  });

  it("acessa a página da política de privacidade removendo o target e então clicando no link", () => {
    cy.contains("a", "Política de Privacidade")
      .invoke("removeAttr", "target")
      .click();

    cy.contains("h1", "CAC TAT - Política de Privacidade").should("be.visible");
  });

  it("faz uma requisição HTTP", () => {
    cy.request('https://cac-tat-v3.s3.eu-central-1.amazonaws.com/index.html')
      .as('getRequest')
      .its('status')
      .should('be.equal', 200)

    cy.get('@getRequest')
      .its('statusText')
      .should('be.equal', 'OK')

    cy.get('@getRequest')
      .its('body')
      .should('include', 'CAC TAT')
  })

  it("encontra o gato escondido", () => {

    cy.get("#cat")
    .invoke('show')
    .should('be.visible')
  })
});
