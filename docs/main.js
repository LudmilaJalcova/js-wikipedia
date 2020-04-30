const searchForm = document.getElementById('searchForm')
const input = document.getElementById('inputSearchWikipedia')
const feedback = document.getElementById('feedback')
const cardWrapper = document.getElementById('cardGroup')

const request = url => {
	return new Promise((resolve, reject) => {
		fetch(url)
			.then(response => response.json())
			.then(data => resolve(data))
			.catch(err => reject(err))
	})
}

const displayData = data => {
	const results = data.query.search

	let card = ''

	results.forEach(result => {
		const { pageid, snippet, title } = result
		const linkReadme = `https://en.wikipedia.org/?curid=${pageid}`

		card += `
				<div class="col-10 mx-auto col-md-6 col-lg-4 my-3">
					<div class="card card-body">
						<h3 style="color: rgb(89, 149, 165);" class="card-title">
							${title}
						</h3>
						<p class="card-text">
							${snippet}
						</p>
						<p class="card-text">
							<a
								target="_blank"
								style="color: rgb(39, 188, 230);"
								href="${linkReadme}"
							>
								Read More...
							</a>
						</p>
					</div>
				</div>
			`
	})

	cardWrapper.innerHTML = card
}

const showFeedback = text => {
	feedback.innerHTML = `
		<div style="color: #dc7486; background-color: #eccdd2; border: 1px solid #dc7486; border-radius: 5px; text-align: center; margin-bottom: 20px;">
			${text}
		</div>
	`
	setTimeout(() => {
		feedback.innerHTML = null
	}, 2000)
}

const searchWikiItem = async event => {
	event.preventDefault()

	let value = input.value
	if (value.length === 0) {
		showFeedback('Please Enter A Valid Search Value !')
	} else {
		value = ''
		cardWrapper.innerHTML = null
		try {
			const url = `https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&list=search&srsearch=${input.value}`

			const data = await request(url)
			displayData(data)
		} catch (err) {
			console.log(err)
		}
	}
}

searchForm.addEventListener('submit', searchWikiItem)
