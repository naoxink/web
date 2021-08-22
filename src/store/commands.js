import projects from '@/store/projects.js'

export default {
	'whoami': _ => {
		_.addLine(`First of all: thanks for visiting my website :)

I'm a fullstack developer with a lot of energy to learn
everyday and no matter what.

I like to stay as "updated" as I can doing in my spare time little projects.
If you want to have a look here's a link to my GitHub:`)
		_.addLine(`<a target="_blank" href="#!">[naoxink@github]</a>`)
		_.addLine('with ♥')
	},
	'projects': _ => {
		_.addLine('Listing my little projects:')
		let list = '<ul>'
		for(let label in projects){
			if(projects[label].link){
				label = `<a target="_blank" href="${projects[label].link}">${label}</a>`
			}
			list += `<li>${label}</li>`
		}
		list += '</ul>'
		_.addLine(list, 1)
	}
}