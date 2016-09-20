// Object builders
// ---------------
function __repo(info) {
var repo = {
    id:            info.id,
    name:          info.name,
    fullName:      info.full_name,
    language:      info.language,
    url:           info.url,
    htmlUrl:       info.html_url,
    gitUrl:        info.git_url,
    sshUrl:        info.ssh_url,
    cloneUrl:      info.clone_url,
    createdAt:     info.created_at,
    updatedAt:     info.updated_at,
    pushedAt:      info.pushed_at,
    description:   info.description,
    fork:          info.fork,
    defaultBranch: info.default_branch,
    stars:         info.stargazers_count,
    forks:         info.forks_count,
    homepage:      info.homepage,
    hasHages:      info.has_pages,
    owner:         { id: info.owner.id, login: info.owner.login, htmlUrl: info.owner.html_url }
};
return repo;
}

function __gistFile(info) {
    var file = {
        name:     info.filename,
        language: info.language,
        url:      info.raw_url,
        size:     info.size,
        type:     info.type
    }
    return file;
}