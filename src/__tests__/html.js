import test from "ava"

import { transformToHtml } from "./helpers/transform"

test(
  "should add an extension",
  t => t.snapshot(transformToHtml("!icon"))
)

test(
  "should add an extension with an id",
  t => t.snapshot(transformToHtml("!icon{ #my-id }"))
)

test(
  "should add an extension with a class",
  t => t.snapshot(transformToHtml("!icon{ .my-class }"))
)

test(
  "should add an extension with an attribute",
  t => t.snapshot(transformToHtml("!icon{ attr=my-attr }"))
)

test(
  "should add an extension with a quoted attribute",
  t => t.snapshot(transformToHtml(`!icon{ attr="my attribute" }`))
)

test(
  "should add an extension with a lone attribute",
  t => t.snapshot(transformToHtml(`!icon{ attr }`))
)

test(
  "should add an extension with a lone attribute with a default value",
  t => t.snapshot(
    transformToHtml(
      `!icon{ attr }`,
      {
        elements: {
          icon: {
            propsDefaultValues: {
              attr: "default",
            }
          }
        }
      }
    )
  )
)

test(
  "should add an extension with a lone attribute with a default boolean value",
  t => t.snapshot(
    transformToHtml(
      `!icon{ highlight }`,
      {
        elements: {
          icon: {
            propsDefaultValues: {
              highlight: true,
            }
          }
        }
      }
    )
  )
)

test(
  "should add an extension with all types of parameters",
  t => t.snapshot(
    transformToHtml(
      `!icon{ #my-id .my-class attr attr2=my-attr attr3="my attribute" }`,
      {
        elements: {
          icon: {
            propsDefaultValues: {
              attr: "default",
            }
          }
        }
      }
    )
  )
)

test(
  "should add an extension with a boolean property",
  t => t.snapshot(
    transformToHtml(
      "!checkbox",
      {
        elements: {
          checkbox: {
            html: {
              tagName: "checkbox",
              properties: {
                checked: true
              }
            }
          }
        }
      }
    )
  )
)

test(
  "should add an extension with a mapped content",
  t => t.snapshot(
    transformToHtml(
      "!icon[my-tooltip]",
      {
        elements: {
          icon: {
            html: {
              properties: {
                tooltip: "::content::"
              }
            }
          }
        }
      }
    )
  )
)

test(
  "should add an extension with a mapped argument",
  t => t.snapshot(
    transformToHtml(
      "!icon(my-icon)",
      {
        elements: {
          icon: {
            html: {
              properties: {
                icon: "::argument::"
              }
            }
          }
        }
      }
    )
  )
)

test(
  "should work with a different placeholder affix",
  t => t.snapshot(
    transformToHtml(
      "!icon(my-icon)",
      {
        placeholderAffix: "||",
        elements: {
          icon: {
            html: {
              properties: {
                icon: "||argument||"
              }
            }
          }
        }
      }
    )
  )
)

test(
  "should add an extension with a replaced tag",
  t => t.snapshot(
    transformToHtml(
      "!icon",
      {
        elements: {
          icon: {
            html: {
              tagName: "my-icon"
            }
          }
        }
      }
    )
  )
)

test(
  "should work with other markdown",
  t => t.snapshot(
    transformToHtml(
      `#heading

!icon`
    )
  )
)

test(
  "should work with an element with multiple children",
  t => t.snapshot(
    transformToHtml(
      "!icon",
      {
        elements: {
          icon: {
            html: {
              children: [
                {
                  tagName: "p",
                  children: [
                    {
                      type: "text",
                      value: "test"
                    }
                  ]
                }
              ]
            }
          }
        }
      }
    )
  )
)

test(
  "should work with an element with a mapped property on a child",
  t => t.snapshot(
    transformToHtml(
      "!icon{ #test }",
      {
        elements: {
          icon: {
            html: {
              children: [
                {
                  tagName: "p",
                  properties: {
                    id: "::prop::id::"
                  }
                }
              ]
            }
          }
        }
      }
    )
  )
)

test(
  "should work with an element with a mapped content on a child value",
  t => t.snapshot(
    transformToHtml(
      "!icon[my-content]",
      {
        elements: {
          icon: {
            html: {
              children: [
                {
                  tagName: "p",
                  children: [
                    {
                      type: "text",
                      value: "::content::"
                    }
                  ]
                }
              ]
            }
          }
        }
      }
    )
  )
)

test(
  "should work with an element with multiple children on the same level",
  t => t.snapshot(
    transformToHtml(
      "!icon",
      {
        elements: {
          icon: {
            html: {
              children: [
                {
                  tagName: "p",
                  children: [
                    {
                      type: "text",
                      value: "test"
                    }
                  ]
                },
                {
                  tagName: "span",
                  children: [
                    {
                      type: "text",
                      value: "bla"
                    }
                  ]
                }
              ]
            }
          }
        }
      }
    )
  )
)
