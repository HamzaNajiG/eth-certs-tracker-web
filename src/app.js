App = {
  loading: false,
  contracts: {},

  load: async () => {
    await App.loadWeb3()
    await App.loadAccount()
    await App.loadContract()
    await App.render()
  },

  loadWeb3: async () => {
    if (typeof web3 !== 'undefined') {
      App.web3Provider = web3.currentProvider
      web3 = new Web3(web3.currentProvider)
    } else {
      window.alert("Please connect to Metamask.")
    }
    // Modern dapp browsers...
    if (window.ethereum) {
      window.web3 = new Web3(ethereum)
      try {
        // Request account access if needed
        await ethereum.enable()
        // Acccounts now exposed
        web3.eth.sendTransaction({/* ... */})
      } catch (error) {
        // User denied account access...
      }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
      App.web3Provider = web3.currentProvider
      window.web3 = new Web3(web3.currentProvider)
      // Acccounts always exposed
      web3.eth.sendTransaction({/* ... */})
    }
    // Non-dapp browsers...
    else {
      console.log('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  },

  loadAccount: async () => {
    // Set the current blockchain account
    web3.eth.defaultAccount = web3.eth.accounts[0]
    // App.account = web3.eth.accounts[0]
  },

  loadContract: async () => {
    const certs = await $.getJSON('Certs.json')
    App.contracts.Certs = TruffleContract(certs)
    App.contracts.Certs.setProvider(App.web3Provider)

    App.certs = await App.contracts.Certs.deployed()
  },

  render: async () => {
    if (App.loading) {
      return
    }

    App.setLoading(true)

    // Render Account
    $('#account').html(App.account)

    // Render Tasks
    await App.renderTasks()

    // Update loading state
    App.setLoading(false)
  },

  renderTasks: async () => {
    const certsCount = await App.certs.certsCount()
    const $certificateTemplate = $('.certificateTemplate')

    for (var i = 1; i <= certsCount; i++) {
      const certificate = await App.certs.certificates(i)
      const certificateId = certificate[0].toNumber()
      const title = certificate[1]
      const date = certificate[2]
      const student = certificate[3]
      const university = certificate[4]
      const content = `A certificate: <strong>${title}</strong> was given to <strong>${student}</strong> from <strong>${university}</strong> on <strong>${date}</strong>`

      const $newCertificateTemplate = $certificateTemplate.clone()
      $newCertificateTemplate.find('.content').html(content)
      $newCertificateTemplate.find('input')
                      .prop('name', certificateId)
                

   
      
      $('#certificates').append($newCertificateTemplate)
      $newCertificateTemplate.show()
    }
  },

  addCertificate: async () => {
    App.setLoading(true)
    const title = $('#title').val();
    const date = $('#date').val();
    const nameOfStudent = $('#nameOfStudent').val();
    const universityName = $('#universityName').val();
    await App.certs.addCertificate(title,date,nameOfStudent,universityName);
    window.location.reload()
  },

  

  setLoading: (boolean) => {
    App.loading = boolean
    const loader = $('#loader')
    const content = $('#content')
    if (boolean) {
      loader.show()
      content.hide()
    } else {
      loader.hide()
      content.show()
    }
  }
}

$(() => {
  $(window).load(() => {
    App.load()
  })
})
