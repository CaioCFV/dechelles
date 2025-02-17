import { slugify } from '../../utils/slugify'
export type newsletterData = {
  name: string
  email: string
}
export const newsletterFactory = function () {
  return {
    send: (data: newsletterData) => {
      if (!data) {
        throw Error('Data not defined to newsletterFactory')
      }
      return new Promise(function (resolve) {
        fetch(`/api/dataentities/NW/documents/${slugify(data.email)}`, {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/vnd.vtex.ds.v10+json',
          },
        })
          .then(function (response) {
            return response.text()
          })
          .then(function (json) {
            if (!json.length) {
              fetch(`/api/dataentities/NW/documents`, {
                method: 'POST',
                body: JSON.stringify({ ...data, id: slugify(data.email) }),
                headers: {
                  Accept: 'application/vnd.vtex.ds.v10+json',
                  'Content-Type': 'application/json',
                },
              })
            }
            return resolve(true)
          })
      })
    },
  }
}
